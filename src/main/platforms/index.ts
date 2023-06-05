import Constants from "utils/Constants";

import { IPlatform } from "./IPlatform";
import { MacPlatform } from "./mac";
import { WindowsPlatform } from "./windows";

function getPlatform(): IPlatform {

    if(process.platform === Constants.platforms.windows) return WindowsPlatform.getInstance();
    if(process.platform === Constants.platforms.mac) return MacPlatform.getInstance();
    
    throw new Error("OS not currently supported");
}

export { getPlatform };