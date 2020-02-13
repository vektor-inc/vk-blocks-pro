function saveCheckBox(post_id, ajax_nonce) {
  const selectElement = document.querySelector(
    "#is_registerd_vkb_template" + post_id
  );
  selectElement.addEventListener("change", event => {
    if (self.fetch) {
      let params = new URLSearchParams();
      params.append("action", "my_action");
      params.append("security", ajax_nonce);
      params.append(
        "my_string",
        JSON.stringify({
          postId: post_id,
          checked: selectElement.checked
        })
      );
      fetch(ajaxurl, {
        method: "POST",
        credentials: "same-origin",
        body: params
      })
        .then(response => response.json())
        .then(data => console.log(JSON.stringify(data))) // JSON-string from `response.json()` call
        .catch(error => console.error(error));
    } else {
      alert(
        "ご使用のブラウザはサポートしていません。Chrome, firefox, Edge等の最新版のブラウザをご使用下さい"
      );
    }
  });
}
