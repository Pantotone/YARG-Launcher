import LaunchPage from "@app/components/LaunchPage";
import { useYARGRelease } from "@app/hooks/useYARGRelease";
import { useYARGVersion } from "@app/hooks/useYARGVersion";

function StableYARGPage() {
    const releaseData = useYARGRelease("stable");
    const yargVersion = useYARGVersion(releaseData, "stable");

    return (<>
        <LaunchPage version={yargVersion} playName="STABLE" description={<>
            YARG (a.k.a. Yet Another Rhythm Game) is a free, open-source, plastic guitar game that is
            still in development. It supports guitar (five fret), drums (plastic or e-kit), vocals,
            pro-guitar, and more!
        </>} websiteUrl="https://github.com/YARC-Official/YARG" />
    </>);
}

export default StableYARGPage;