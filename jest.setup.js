global.TextEncoder = require("util").TextEncoder;
// img_path をモックしてエラーを回避する
global.img_path = {
    full_path: 'path/to/default/image.jpg', // 任意のダミーパスを指定
  };
  