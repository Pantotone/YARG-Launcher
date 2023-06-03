import decompress from 'decompress';

async function uncompress(file: string, destination: string) {
    return decompress(file, destination);
}

export { uncompress };