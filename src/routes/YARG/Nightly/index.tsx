import { PlayStates, usePlayYARG } from "@app/hooks/usePlayYARG";
import { useYARGRelease } from "@app/hooks/useReleases";
import { DownloadStates, useDownloadYARG } from "@app/hooks/useDownloadYARG";

function NightlyYARGPage() {
    const releaseData = useYARGRelease("nightly");

    const { state: playState, play } = usePlayYARG(releaseData.tag_name);
    const { state: downloadState, download } = useDownloadYARG(releaseData);

    return (<>

        <h1>YARG nightly version page</h1>
        <p>this page is on /src/routes/YARG/nightly/index.tsx</p>

        <p>Current version: {releaseData?.tag_name}</p>
        
        { 
            playState === PlayStates.CLOSED ? "Closed game" :
            playState === PlayStates.ERROR ? "Error loading game, check the logs on dev tools" :
            playState === PlayStates.LOADING ? "Loading game" :
            playState === PlayStates.PLAYING ? "Playing" : 
            "State not defined"
        }
        
        {
            releaseData ? <button onClick={() => play()}>Play YARG nightly {releaseData?.tag_name}</button> : ""
        }

        {
            downloadState === DownloadStates.DOWNLOADING ? "Downloading game" :
            downloadState === DownloadStates.DOWNLOADED ? "Finished download" :
            downloadState === DownloadStates.ERROR ? "Error downloading game, check the logs on dev tools" : 
            "State not defined"
        }

        <div>
            <button onClick={() => download()}>Download Release</button>
        </div>

    </>);
}

export default NightlyYARGPage;