class Listener<T> {
    private callbacks: Set<(...args: [T]) => void>;

    constructor() {
        this.callbacks = new Set<(...args: [T]) => void>();
    }

    addCallback = (callback: (...args: [T]) => void) => {
        return this.callbacks.add(callback);
    }

    trigger = (data: T) => {
        return this.callbacks.forEach(callback => callback(data))
    }
}

export default Listener;