import { YARGStates, YARGVersion } from "@app/hooks/useYARGVersion";
import { ButtonColor } from "../../Button";
import { InstallingIcon, UpdateIcon } from "@app/assets/Icons";
import { calculatePayloadPercentage } from "@app/utils/Download/payload";
import PayloadProgress from "../../PayloadProgress";
import Button from "@app/components/Button";
// import { DropdownButton, DropdownItem } from "@app/components/DropdownButton";

interface LaunchButtonProps extends React.PropsWithChildren {
    version: YARGVersion,
    playName: string,
    style?: React.CSSProperties
}

export function LaunchButton(props: LaunchButtonProps) {
    const { version, playName } = props;

    if (version.state === YARGStates.NEW_UPDATE) {
        const buttonChildren = <>
            <UpdateIcon /> Update {playName}
        </>;

        return <Button
            style={props.style}
            color={ButtonColor.GREEN}
            onClick={() => version.download()}>

            {buttonChildren}
        </Button>;
    }

    if (version.state === YARGStates.DOWNLOADING) {
        const buttonChildren = <>
            <InstallingIcon />
            <PayloadProgress payload={version.payload} />
        </>;

        return <Button
            style={props.style}
            progress={calculatePayloadPercentage(version.payload)}
            color={ButtonColor.YELLOW}>

            {buttonChildren}
        </Button>;
    }

    if (version.state === YARGStates.AVAILABLE) {
        const buttonChildren = <>
            Play {playName}
        </>;

        // const dropdownChildren = <>
        //     <DropdownItem>
        //         Open Folder
        //     </DropdownItem>
        //     <DropdownItem>
        //         Clear Caches
        //     </DropdownItem>
        //     <DropdownItem>
        //         Uninstall
        //     </DropdownItem>
        // </>;

        return <Button
            style={props.style}
            color={ButtonColor.BLUE}
            onClick={() => version.play()}>

            {buttonChildren}
        </Button>;
    }

    if (version.state === YARGStates.PLAYING) {
        const buttonChildren = <>
            Opening YARG {playName}
        </>;

        return <Button
            color={ButtonColor.GRAY}
            style={props.style}>

            {buttonChildren}
        </Button>;
    }

    if (version.state === YARGStates.ERROR) {
        const buttonChildren = <>
            Error!
        </>;

        return <Button
            color={ButtonColor.RED}
            style={props.style}>

            {buttonChildren}
        </Button>;
    }

    return <Button
        style={props.style}>
        Loading...
    </Button>;
}