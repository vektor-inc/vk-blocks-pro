// Import Blocks | リファクタリング後の新方式で読み込み
import { registerVKBlocks } from "./index"
registerVKBlocks();

//Bundle JS
import "../translation_dummy.js";
import "../extensions/core/heading/style";
import "../extensions/core/group/style";
import "../extensions/core/list/style";
import "../extensions/core/image/style";
import "../extensions/common/hidden-extension";
import "../extensions/common/highlighter";
import "../extensions/common/nowrap";
import "./staff/block.js";
import "./spacer/block.js";
import "./heading/block.js";
import "./alert/index.js";
import "./balloon/block.js";
import "./button/block.js";
import "./faq/block.js";
import "./flow/block.js";
import "./pr-blocks/block.js";
import "./pr-content/block.js";

/*WP5.3 以下では読み込まれない*/
import "../extensions/common/responsive-br";
import "./border-box/block.js";
import "./faq2/block.js";
import "./faq2-q/block.js";
import "./faq2-a/block.js";
import "./page-content/block.js";
import "./_pro/icon-card-item/block.js";
import "./_pro/icon-card/block.js";
import "./_pro/card-item/block.js";
import "./_pro/card/block.js";
import "./_pro/child-page/block.js";
import "./_pro/post-list/block.js";
import "./_pro/outer/block.js";
import "./_pro/table-of-contents/block.js";
import "./_pro/table-of-contents-new/block.js";
import "./_pro/step-item/block.js";
import "./_pro/step/block.js";
import "./_pro/timeline-item/block.js";
import "./_pro/timeline/block.js";
import "./_pro/grid-column/block.js";
import "./_pro/grid-column-item/block.js";
import "./_pro/slider/block.js";
import "./_pro/slider-item/block.js";
import "./_pro/animation/block.js";
