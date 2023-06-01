import { IPlatform } from "operational/platforms/IPlatform";
import fs from 'fs';
import path from 'path';
import api from "operational/api";

class BaseChannel {
    name: string;
    os: IPlatform;

    constructor(name: string, os: IPlatform) {
        this.name = name;
        this.os = os;

        // Create the channel folder in case it doesn't exist
        fs.access(this.folder, err => {
            if(err) {
                fs.mkdir(this.folder, err => console.error(err));
            };
        });
    }

    get folder(): string {
        return path.join(this.os.getGameFolderPath(), this.name);
    }

    startGame(version: string): void {
        const gameExecutablePath = path.join(this.folder, version, this.os.gameExecutableName);
        return this.os.run(gameExecutablePath);
    }

    async checkUpdate() {
        const update = await api.getLatestUpdate(this.name, this.os.name);
        const versionFolder = path.join(this.folder, update.version);

        try {
            await fs.promises.access(versionFolder);
            return false;
        } catch (error) {
            return true;
        }
    }

    downloadLatest() {

    }
};

export default BaseChannel;