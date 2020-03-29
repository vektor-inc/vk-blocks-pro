import ReactDOMServer from "react-dom/server";
const { __ } = wp.i18n;
const { useSelect } = wp.data;
import classNames from "classnames";

export const isAllowedBlock = (name, allowedBlocks) => {
  return allowedBlocks.find(blockName => blockName === name);
};

export const transformToOneDimensionalArray = multiDimensionalarray => {
  return multiDimensionalarray.reduce((accumulator, currentValue) => {
    return accumulator.concat(currentValue);
  }, []);
};

export const getBlocksByName = blockName =>
  useSelect(select => {
    const { getBlocks } = select("core/block-editor");
    return getBlocks().filter(block => block.name == blockName);
  }, []);

export const getBlocksByClientId = clientId =>
  useSelect(select => {
    const { getBlocks } = select("core/block-editor");
    return getBlocks().filter(block => block.clientId == clientId);
  }, []);

export const getInnerBlocks = allowedBlocks =>
  useSelect(select => {
    const { getBlocks } = select("core/block-editor");
    return getBlocks().reduce((accumulator, block) => {
      if (block.innerBlocks && isAllowedBlock(block.name, allowedBlocks)) {
        accumulator.push(block.innerBlocks);
      }
      return accumulator;
    }, []);
  }, []);

export const getBlockIndex = clientId =>
  useSelect(select => {
    const { getBlockIndex } = select("core/block-editor");
    return getBlockIndex(clientId) || "";
  }, []);

export const getHeadingsFromInnerBlocks = (innerBlocks, headingBlocks) => {
  //多次元配列を配列に変換
  innerBlocks = transformToOneDimensionalArray(innerBlocks);

  //見出しブロックを抽出
  let result = innerBlocks.reduce((accumulator, currentValue) => {
    if (isAllowedBlock(currentValue.name, headingBlocks)) {
      accumulator.push(currentValue);
    }
    return accumulator;
  }, []);

  const cHeadings = getBlocksByName("core/heading");
  const vHeadings = getBlocksByName("vk-blocks/heading");
  let headings = cHeadings.concat(vHeadings);
  return headings.concat(result);
};

export const getChildIndex = (rootClientId, clientId) => {
  let childIndex = "";

  if (rootClientId != undefined) {
    let parent = getBlocksByClientId(rootClientId);
    let children = parent[0].innerBlocks;

    if (children != undefined) {
      childIndex = children.findIndex(child => child.clientId === clientId);
      childIndex = `-${childIndex}`;
    }
  }
  return childIndex;
};

export const returnHtml = (source, attributes, className) => {
  const { style, open } = attributes;
  if (!className) {
    className = "vk_tableOfContents";
  } else {
    className = className + " vk_tableOfContents";
  }

  if (style) {
    className = className + " vk_tableOfContents-style-" + style;
  }

  let listClassName = "vk_tableOfContents_list_item";
  let countSeparater = ".";
  let h2Count = 0;
  let h3Count = 0;
  let h4Count = 0;
  let h5Count = 0;
  let h6Count = 0;
  const fixZero = count => {
    if (count === 0) {
      return 1;
    } else {
      return count;
    }
  };

  let returnHtmlContent = "";
  if (source) {
    returnHtmlContent = source.map(data => {
      let baseClass = "vk_tableOfContents_list_item";

      let level = data.attributes.level;
      let preNumber = "";

      if (level === 2) {
        h2Count++;
        preNumber = h2Count;

        // Reset
        h3Count = 0;
        h4Count = 0;
        h5Count = 0;
        h6Count = 0;
      }

      if (level === 3) {
        h3Count++;
        preNumber = h2Count + countSeparater + h3Count;

        // Reset
        h4Count = 0;
        h5Count = 0;
        h6Count = 0;
      }

      if (level === 4) {
        h4Count++;
        preNumber =
          h2Count +
          countSeparater +
          fixZero(h3Count) +
          countSeparater +
          h4Count;

        // Reset
        h5Count = 0;
        h6Count = 0;
      }

      if (level === 5) {
        h5Count++;
        preNumber =
          h2Count +
          countSeparater +
          fixZero(h3Count) +
          countSeparater +
          fixZero(h4Count) +
          countSeparater +
          h5Count;

        // Reset
        h6Count = 0;
      }

      if (level === 6) {
        h6Count++;
        preNumber =
          h2Count +
          countSeparater +
          fixZero(h3Count) +
          countSeparater +
          fixZero(h4Count) +
          countSeparater +
          fixZero(h5Count) +
          countSeparater +
          h6Count;
      }

      preNumber = preNumber + ". ";

      let content = data.attributes.content
        ? data.attributes.content
        : data.attributes.title;

      return (
        <li
          key={data.clientId}
          className={`${baseClass} ${baseClass}-h-${level}`}
        >
          <a
            href={`#${data.attributes.anchor}`}
            className={`${baseClass}_link`}
          >
            <span className={`${baseClass}_link_preNumber`}>{preNumber}</span>
            {content}
          </a>
        </li>
      );
    });
  }

  let returnHtml = (
    <div className={classNames(className, "tabs")}>
      <div className="tab">
        <div className={"vk_tableOfContents_title"}>
          {__("Table of Contents", "vk-blocks")}
        </div>
        <input type="checkbox" id="chck1" />
        <label
          className="tab-label vk_tableOfContents_openCloseBtn"
          htmlFor="chck1"
        />
        <ul className={`vk_tableOfContents_list tab_content-${open}`}>
          {returnHtmlContent}
        </ul>
      </div>
    </div>
  );
  return ReactDOMServer.renderToString(returnHtml);
};
