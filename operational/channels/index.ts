import { IPlatform } from "operational/platforms/IPlatform";
import fs from 'fs';
import path from 'path';
import api from "operational/api";
import { getPlatform } from "operational/platforms";
import { Downloader } from "utils/DownloadManager";
import { readJSON } from "fs-extra";

type ChannelSettings = {
    selectedVersion?: string,
    autoDeleteOlderVersions?: boolean
};

class Channel {
    name: string;
    os: IPlatform = getPlatform();

    constructor(name: string) {
        this.name = name;
    }

    get folder(): string {
        return path.join(this.os.getGameFolderPath(), this.name);
    }

    get settingsPath(): string {
        return path.join(this.folder + "/settings.json")
    }

    async currentVersion(): Promise<string | undefined> {
        return (await this.getSettings()).selectedVersion
    }

    async getSettings(): Promise<ChannelSettings> {
        return readJSON(this.settingsPath);
    }

    startGame(version: string): void {
        const gameExecutablePath = path.join(this.folder, version, this.os.gameExecutableName);
        return this.os.run(gameExecutablePath);
    }

    async checkNewUpdate() {
        const update = await api.getUpdate(this.name, this.os.name, "latest");
        return this.checkVersionInstalled(update.version);
    }

    async checkVersionInstalled(version: string) {
        const versionFolder = path.join(this.folder, version);

        try {
            await fs.promises.access(versionFolder);
            return false;
        } catch (error) {
            return true;
        }
    }

    async downloadVersion(version: string = "latest") {
        const update = await api.getUpdate(this.name, this.os.name, version);
        const versionFolder = path.join(this.folder, update.version);

        const download = new Downloader(update.files, versionFolder);
        
        download.onError(() => console.log("oopsies theres an error ;PPP"))
        download.onUpdate((info) => { console.log(`Downloader: ${info.received}/${info.total} bytes (${ (info.received/info.total) * 100 }%)`); })
        download.onFinish(() => console.log("Finished download"))
        return await download.start();
    }
};

export default Channel;