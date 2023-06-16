import { invoke } from "@tauri-apps/api/tauri";
import { useState } from "react"

export enum PlayStates {
    "CLOSED",
    "LOADING",
    "ERROR",
    "PLAYING"
};

export const usePlayYARG = (version: string) => {
    const [state, setState] = useState<PlayStates>(PlayStates.CLOSED);
    
    const play = () => {
        setState(PlayStates.LOADING);

        invoke("play_yarg", {
            versionId: version,
        }).then(_ => {
            setState(PlayStates.PLAYING);
        }).catch(e => {
            setState(PlayStates.ERROR);
            console.error(e);
        });
    }

    return { state, play }
}