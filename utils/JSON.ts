import { readJson, writeJSON } from 'fs-extra';
 
function updateJSON(path: string, data: object) {
    return readJson(path, (err, old = {}) => {
        
        const updated = {...old, ...data};
        return writeJSON(path, updated);

    });
}


export { updateJSON };