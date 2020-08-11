import { registerSidebar } from "./helper";

import * as menu from "./index";

if (5.3 <= parseFloat(wpVersion) && 5.5 >= parseFloat(wpVersion) ) {
    registerSidebar(menu);
}
