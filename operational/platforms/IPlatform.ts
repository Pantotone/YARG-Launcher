export interface IPlatform {
    name: string,
    gameExecutableName: string,

    getTemporaryFolderPath(): string,
    getGameFolderPath(): string,
    getDataFolderPath(): string,

    preInstall(): Promise<void>,
    install(): Promise<void>,
    postInstall(): Promise<void>,

    run(path: string): void,
}