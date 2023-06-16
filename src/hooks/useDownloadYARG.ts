import { invoke } from "@tauri-apps/api/tauri";
import { useState } from "react"
import { ReleaseData, getYARGReleaseZip } from "./useReleases";

export enum DownloadStates {
    "DOWNLOADED",
    "DOWNLOADING",
    "ERROR"
};

export const useDownloadYARG = (releaseData: ReleaseData) => {
    const [state, setState] = useState<DownloadStates>();

    const download = async () => {
        setState(DownloadStates.DOWNLOADING);

        const zipUrl = await getYARGReleaseZip(releaseData);

        invoke("download_yarg", {
            zipUrl: zipUrl,
            versionId: releaseData.tag_name
        }).then(_ => {
            setState(DownloadStates.DOWNLOADED);
        }).catch(e => {
            setState(DownloadStates.ERROR);
            console.error(e);
        });
    }

    return { state, download }
}