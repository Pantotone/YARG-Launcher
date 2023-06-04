import Constants from "utils/Constants";

async function apiCall(path: string, options?: RequestInit) {
    return fetch(Constants.API_baseURL + path, options).then(res => res.json());
}

type UpdateDownload = {
    downloadURL: string,
    uncompress?: boolean,
}

type Update = {
    sha: string,
    version: string,
    minLauncherVersion: string,
    files: UpdateDownload[],
};

async function getAllUpdates(channelName: string, platform: string) {
    throw new Error("Not implemented yet.");
}

async function getUpdate(channelName: string, platform: string, version: string = "latest"): Promise<Update> {
    const update = await apiCall(`${channelName}/${version}/${platform}.json`);
    return update;
}

export default { getUpdate, getAllUpdates };
export type { UpdateDownload };