import { PlayStates, usePlayYARG } from "@app/hooks/usePlayYARG";
import { useYARGRelease, getYARGReleaseZip } from "@app/hooks/useReleases";
import { invoke } from "@tauri-apps/api/tauri";
import { useState } from "react";

function NightlyYARGPage() {
    const [debugMsg, setDebugMsg] = useState("");
    const releaseData = useYARGRelease("nightly");
    const { state, play } = usePlayYARG(releaseData.tag_name);

    async function download(version: string) {
        try {
            setDebugMsg("Loading...");

            // Get the zip url
            let zipUrl = await getYARGReleaseZip(releaseData);

            // Download it
            await invoke("download_yarg", {
                zipUrl: zipUrl,
                versionId: version
            });

            setDebugMsg("Done!");
        } catch (e) {
            setDebugMsg(`FAILED: ${e}`);
        }
    };

    return (<>

        <h1>YARG nightly version page</h1>
        <p>this page is on /src/routes/YARG/nightly/index.tsx</p>

        <p>Debug message: {debugMsg}</p>

        <p>Current version: {releaseData?.tag_name}</p>
        
        { 
            state === PlayStates.CLOSED ? "Closed game" :
            state === PlayStates.ERROR ? "Error loading game" :
            state === PlayStates.LOADING ? "Loading game" :
            state === PlayStates.PLAYING ? "Playing" : 
            "State not defined"
        }
        
        {
            releaseData ? <button onClick={() => play()}>Play YARG nightly {releaseData?.tag_name}</button> : ""
        }

        <div>
            <button onClick={() => download(releaseData.tag_name)}>Download Release</button>
        </div>

    </>);
}

export default NightlyYARGPage;