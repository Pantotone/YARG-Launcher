import { IPlatform } from "operational/platforms/IPlatform";

export class WindowsPlatform implements IPlatform {
    constructor() {
        
    }

    getTemporaryFolderPath(): string {
        throw new Error("Method not implemented.");
    }

    getMainFolderPath(): string {
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