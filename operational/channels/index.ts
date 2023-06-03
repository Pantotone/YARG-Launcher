import { IPlatform } from "operational/platforms/IPlatform";
import fs from 'fs';
import path from 'path';
import api from "operational/api";
import { getPlatform } from "operational/platforms";
import { Downloader } from "utils/DownloadManager";

class Channel {
    name: string;
    os: IPlatform = getPlatform();

    constructor(name: string) {
        this.name = name;
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

    async downloadLatest() {
        const update = await api.getLatestUpdate(this.name, this.os.name);
        const versionFolder = path.join(this.folder, update.version);

        const download = new Downloader(update.files, versionFolder);
        
        download.onError(() => console.log("oopsies theres an error ;PPP"))
        download.onUpdate((info) => { console.log(`Downloader: ${info.received}/${info.total} bytes (${ (info.received/info.total) * 100 }%)`); })
        download.onFinish(() => console.log("Finished download"))
        return await download.start();
    }
};

export default Channel;