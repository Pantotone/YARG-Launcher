import { createStore } from "zustand/vanilla";
import { IBaseDownload } from "./Processors/base";

type DownloadQueueStore = {
    queue: Set<IBaseDownload>
};

export class DownloadQueueHandler {
    queueStore = createStore<DownloadQueueStore>(() => ({queue: new Set()}));
       
    current?: IBaseDownload;

    add(downloader: IBaseDownload) {
        this.queueStore.setState((prev) => ({ queue: prev.queue.add(downloader) }), true);
    }

    delete(downloader?: IBaseDownload) {
        if(!downloader) return;
        
        this.queueStore.setState((prev) => {
            const newQueue = prev.queue;
            newQueue.delete(downloader);

            return { queue: newQueue };
        }, true);
    }

    next() {
        const next: IBaseDownload | undefined = this.queueStore.getState().queue.values().next().value || undefined;

        this.current = next;
        this.delete(next);

        return next;
    }
}