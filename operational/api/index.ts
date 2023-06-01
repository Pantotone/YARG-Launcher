import Constants from "utils/Constants";

async function apiCall(path: string, options?: RequestInit) {
    return fetch(Constants.API_baseURL + path, options).then(res => res.json());
}

type Update = {
    sha: string,
    version: string,
    minLauncherVersion: string,
    files: string[],
};

async function getLatestUpdate(channelName: string, platform: string): Promise<Update> {
    const update = await apiCall(`${channelName}/${platform}.json`);
    return update;
}

export default { getLatestUpdate };