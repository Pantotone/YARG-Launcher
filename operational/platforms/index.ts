import Constants from "utils/Constants";

import { IPlatform } from "./IPlatform";
import { MacPlatform } from "./mac";
import { WindowsPlatform } from "./windows";

function getPlatform(): IPlatform {

    if(process.platform === Constants.platforms.windows) return new WindowsPlatform;
    if(process.platform === Constants.platforms.mac) return new MacPlatform;
    
    throw new Error("OS not currently supported");
}

export { getPlatform };