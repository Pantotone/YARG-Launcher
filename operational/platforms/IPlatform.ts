export interface IPlatform {
    getTemporaryFolderPath(): string,
    getMainFolderPath(): string,
    getDataFolderPath(): string,

    preInstall(): Promise<void>,
    install(): Promise<void>,
    postInstall(): Promise<void>,
}