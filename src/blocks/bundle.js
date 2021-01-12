// Import Blocks | リファクタリング後の新方式で読み込み
import { registerVKBlocks } from "@vkblocks/blocks/"
registerVKBlocks();

//Bundle JS
import "@vkblocks/translation_dummy.js";
import "@vkblocks/extensions/core/heading/style";
import "@vkblocks/extensions/core/group/style";
import "@vkblocks/extensions/core/list/style";
import "@vkblocks/extensions/core/image/style";
import "@vkblocks/extensions/common/hidden-extension";
import "@vkblocks/extensions/common/highlighter";
import "@vkblocks/extensions/common/nowrap";
import "@vkblocks/blocks/staff/block.js";
import "@vkblocks/blocks/heading/block.js";

// /*WP5.3 以下では読み込まれない*/
import "@vkblocks/extensions/common/responsive-br";
import "@vkblocks/blocks/_pro/icon-card-item/block.js";
import "@vkblocks/blocks/_pro/icon-card/block.js";
import "@vkblocks/blocks/_pro/card-item/block.js";
import "@vkblocks/blocks/_pro/card/block.js";
import "@vkblocks/blocks/_pro/step-item/block.js";
import "@vkblocks/blocks/_pro/step/block.js";
import "@vkblocks/blocks/_pro/grid-column/block.js";
import "@vkblocks/blocks/_pro/grid-column-item/block.js";
import "@vkblocks/blocks/_pro/slider/block.js";
import "@vkblocks/blocks/_pro/slider-item/block.js";
