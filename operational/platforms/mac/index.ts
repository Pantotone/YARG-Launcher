import { IPlatform } from "operational/platforms/IPlatform";

export class MacPlatform implements IPlatform {
    constructor() {
        
    }

    name = "mac";
    gameExecutableName = "YARG.app/Contents/MacOS/YARG";

    run(path: string): void {
        throw new Error("Method not implemented.");
    }
    
    getTemporaryFolderPath(): string {
        throw new Error("Method not implemented.");
    }

    getGameFolderPath(): string {
        throw new Error("Method not implemented.");
    }

    getDataFolderPath(): string {
        throw new Error("Method not implemented.");
    }
    
    preInstall(): Promise<void> {
        throw new Error("Method not implemented.");
    }

    install(): Promise<void> {
        throw new Error("Method not implemented.");
    }

    postInstall(): Promise<void> {
        throw new Error("Method not implemented.");
    }
}