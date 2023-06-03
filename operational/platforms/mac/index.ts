import { IPlatform } from "operational/platforms/IPlatform";
import os from 'os';
import fs from 'fs';
import path from "path";
export class MacPlatform implements IPlatform {
    private static instance: IPlatform;

    private constructor() {
        
    }

    public static getInstance(): IPlatform {
        if(!this.instance) {
            this.instance = new this();
        }

        return this.instance;
    }

    name = "mac";
    gameExecutableName = "YARG.app/Contents/MacOS/YARG";

    run(path: string): void {
        throw new Error("Method not implemented.");
    }
    
    getTemporaryFolderPath(): string {
        const tempPath = path.join(os.tmpdir(), "YARG");

        fs.access(tempPath, (err) => {
            if(err) { 
                fs.mkdirSync(tempPath)
            };
        });

        return tempPath;
    }

    getGameFolderPath(): string {
        return "/Applications/YARG/Game/";
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