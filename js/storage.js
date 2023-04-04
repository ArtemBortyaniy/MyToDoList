function save (key, value) {
    try {
        const data = JSON.stringify(value);
        localStorage.setItem(key, data);
    } catch (err) {
        console.error('error save', err.message);
    }
}

function parseLocalStorage(key) {
    try {
        const data = localStorage.getItem(key);
        return data === null ? undefined : JSON.parse(data);
    } catch (err) {
        console.error('error parse', err.message);
    }
}

export { save, parseLocalStorage };