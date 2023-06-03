import type { UpdateDownload } from "operational/api";
import fs from 'fs';
import path from 'path';
import { https } from 'follow-redirects';
import { IPlatform } from "operational/platforms/IPlatform";
import { getPlatform } from "operational/platforms";
import Listener from "./EventListener";

type UpdateCallback = {
    total: number,
    received: number,
};

class Downloader {
    total: number = 0;
    received: number = 0;
    files: UpdateDownload[] = [];
    destination: string;

    os: IPlatform = getPlatform();

    private errorListener = new Listener;
    public onError = this.errorListener.addCallback;

    private updateListener = new Listener<UpdateCallback>;
    public onUpdate = this.updateListener.addCallback;

    private finishListener = new Listener;
    public onFinish = this.finishListener.addCallback;

    
    constructor(files: UpdateDownload[], destination: string) {
        fs.mkdirSync(destination, { recursive: true });

        this.files = files;
        this.destination = destination;
    }

    async start() {
        this.files.forEach(file => this.processFile(file));

        return new Promise<boolean>((resolve, reject) => {
            this.onFinish(() => resolve(true));
            this.onError(() => reject(false));
        });
    };

    private processFile(file: UpdateDownload) {
        const temporaryFolder = path.join(this.os.getTemporaryFolderPath(), "temp_download");
        fs.mkdirSync(temporaryFolder, { recursive: true });

        const stream = fs.createWriteStream(path.join(temporaryFolder, URLtoFileName(file.downloadURL)));

        try {
            this.startFileDownload(file, stream);
        } catch (err) {
            stream.destroy();
            console.error(err);
            this.errorListener.trigger(err);
            throw new Error(`Downloader: An error occured while downloading ${ URLtoFileName(file.downloadURL) }`);
        }
    }
    
    private startFileDownload(file: UpdateDownload, stream: fs.WriteStream) {
        return https.get(file.downloadURL, res => {
            if(res.statusCode !== 200) throw new Error(`Downloader(${file.downloadURL}): The connection returned a ${res.statusCode}.`);
            
            this.total += Number(res.headers['content-length']);

            res.pipe(stream);

            res.on('data', chunk => {
                this.received += chunk.length;
                this.updateListener.trigger({received: this.received, total: this.total});
            });

            stream.on("finish", () => {
                if(res.complete) {
                    stream.close();
                    this.postFileDownload(file);
                }
            });
        });
    }

    async postFileDownload(file: UpdateDownload) {
        console.log(`Finished download file ${URLtoFileName(file.downloadURL)}`);

        if(this.received >= this.total) {
            this.finishListener.trigger(null);
        }
    }

};

function URLtoFileName(url: string) {
    return url.split('/').at(-1) as string;
}

export { Downloader }
