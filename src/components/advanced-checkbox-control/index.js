const { CheckboxControl } = wp.components;
const { useState } = wp.element;
import { destructiveDeleteFromArray } from "../../utils/delete-from-array";

export const AdvancedCheckboxControl = props => {
  const { schema, rawData, checkedData, setAttributes } = props;
  if (!rawData || !Array.isArray(checkedData) || !checkedData) return false;

  const [checkedState, setCheckedState] = useState(checkedData);

  const advancedSetAttributes = (schema, saveData) => {
    setAttributes({ [schema]: JSON.stringify(saveData) });
  };

  let checkBoxComponents = rawData.map(data => {
    return (
      <CheckboxControl
        label={data.label}
        checked={checkedState.some(item => item === data.slug)}
        onChange={value => {
          if (value) {
            checkedState.push(data.slug);
          } else {
            destructiveDeleteFromArray(checkedState, data.slug);
          }
          setCheckedState(checkedState);
          advancedSetAttributes.bind(null, schema, checkedState)();
        }}
      />
    );
  });
  return <ul>{checkBoxComponents}</ul>;
};

// /**
//  *
//  * @param args
//  * @returns {*}
//  */
// const addCheckBox = args => {
//   if (!args.originData) {
//     return false;
//   }

//   const name = args.name;
//   const originData = args.originData;
//   const checkedData = args.checkedData;
//   const setAttributes = args.setAttributes;
//   const reactDomToRender = [];

//   //投げるデータによりiは,数字やオブジェクトに変わる。
//   for (let i in originData) {
//     switch (name) {
//       case "postTypes":
//         renderPostTypes(
//           reactDomToRender,
//           originData[i].name,
//           originData[i].slug,
//           checkedData,
//           setAttributes
//         );
//         break;

//       case "taxonomy":
//         renderTaxonomy(
//           reactDomToRender,
//           i,
//           originData[i],
//           checkedData,
//           setAttributes
//         );
//         break;
//     }
//   }
//   return <ul>{reactDomToRender}</ul>;
// };

// export default addCheckBox;

// /**
//  *
//  * @param reactDomToRender
//  * @param label
//  * @param slug
//  * @param checkedData
//  * @param setAttributes
//  * @returns {*}
//  */
// const renderPostTypes = (
//   reactDomToRender,
//   label,
//   slug,
//   checkedData,
//   setAttributes
// ) => {
//   if (!Array.isArray(checkedData)) {
//     return false;
//   }

//   if (checkedData)
//     return reactDomToRender.push(
//       <CheckboxControl
//         label={label}
//         checked={checkedData.some(item => item === slug)}
//         onChange={async value => {
//           if (value) {
//             checkedData.push(slug);
//           } else {
//             checkedData = checkedData.filter(elm => elm !== slug);
//           }
//           setAttributes({ isCheckedPostType: JSON.stringify(checkedData) });
//         }}
//       />
//     );
// };

// const renderTaxonomy = (
//   reactDomToRender,
//   tax,
//   slug,
//   checkedData,
//   setAttributes
// ) => {
//   if (checkedData[tax] === undefined) {
//     checkedData[tax] = [];
//   }

//   if (slug) {
//     slug.forEach(term => {
//       let slug = term[0];
//       let label = term[1];

//       reactDomToRender.push(
//         <CheckboxControl
//           label={label}
//           checked={checkedData[tax].some(termItem => termItem === slug)}
//           onChange={value => {
//             if (value) {
//               checkedData[tax].push(slug);
//             } else {
//               checkedData[tax] = checkedData[tax].filter(elm => elm !== slug);
//             }
//             setAttributes({ isCheckedTerms: JSON.stringify(checkedData) });
//           }}
//         />
//       );
//     });
//   }

//   return reactDomToRender;
// };
