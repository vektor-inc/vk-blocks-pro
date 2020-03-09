class viewHelper {
  constructor() {
    let hTags = viewHelper.getDom();
    viewHelper.appendIdHtags(hTags, viewHelper.assignIdHref);
  }

  /**
   * Check the val is not undefined or null.
   * @param val
   * @returns {boolean}
   */
  static isExist(val) {
    return typeof val !== "undefined" && val !== null;
  }

  /**
   * Get hTag's NodeList included in target class's element.
   * @returns {*} NodeListOf<Element> or false
   */
  static getDom() {
    let editor = document.getElementsByClassName(
      "wp-block-vk-blocks-table-of-contents"
    );

    if (viewHelper.isExist(editor[0])) {
      if (editor[0].parentElement) {
        return editor[0].parentElement.querySelectorAll(
          "h1, h2, h3, h4, h5, h6"
        );
      } else {
        return false;
      }
    }
  }

  /**
   * Append span#{id} to inside H Tags in view.
   * @param hTags
   * @param callback
   */
  static appendIdHtags(hTags, callback) {
    if (viewHelper.isExist(hTags)) {
      for (let i = 0; i < hTags.length; i++) {
        let hTag = hTags[i];

        if (!hTag.id) {
          hTag.id = "vk-htags-" + i;
        }
      }

      callback(hTags);
    }
  }

  /**
   * Add Htag's ID to href of Table of Contents block.
   * @param hTags
   */
  static assignIdHref(hTags) {
    let aTags = document.getElementsByClassName(
      "vk_tableOfContents_list_item_link"
    );
    for (let i = 0; i < aTags.length; i++) {
      aTags[i].attributes[0].nodeValue = "#" + hTags[i].id;
    }
  }
}

window.onload = () => {
  new viewHelper();
};
