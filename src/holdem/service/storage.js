
import flatstore from 'flatstore';

class Storage {
    constructor() {

    }

    get(key, defaultValue) {
        try {
            let value = flatstore.get(key) || defaultValue;
            return value;
        } catch (e) {
            console.error(e);
            throw e;
        }
        return null;
    }

    set(key, value) {
        try {
            flatstore.set(key, value);
            this.save(key, value);
        } catch (e) {
            console.error(e);
            throw e;
        }
    }

    load(key, defaultValue) {
        try {
            let value = localStorage.getItem(key) || defaultValue;

            return value;
        } catch (e) {
            console.error(e);
        }
    }

    save(key, value) {
        try {
            localStorage.setItem(key, value);
        } catch (e) {
            console.error(e);
        }

    }
}

export default new Storage();