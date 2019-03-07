import { isIterable } from "./isIterator";

export class ArrayHelper<T=any> {
    private values: Iterable<T> | ArrayLike<T>;
    constructor(iterable: Iterable<T> | ArrayLike<T>) {
        this.values = iterable;
    }
    static from<T=any>(iterable: Iterable<T> | ArrayLike<T>) {
        return new ArrayHelper(iterable);
    }
    flatten<R>() {
        const values = this.values;
        function* createIterator() {
            for (const value of values) {
                if (Array.isArray(value) || isIterable(value)) {
                    for (const iterator of value as any) {
                        yield iterator;
                    }
                } else {
                    yield value;
                }
            }
        }
        return ArrayHelper.from<R>(createIterator());
    }
    filter(predicate: (value: T, index?: number) => boolean) {
        const values = this.values;
        function* createIterator() {
            let index = 0;
            for (const value of values) {
                if (predicate(value, index++)) {
                    yield value;
                }
            }
        }
        return ArrayHelper.from<T>(createIterator());
    }
    forEach(func: (value: T, index?: number) => void) {
        if (typeof func !== 'function') return;
        let index = 0;
        const values = this.values;
        for (const value of values) {
            func(value, index++);
        }
    }
    map<R>(func: (value: T, index?: number) => R) {
        const values = this.values;
        function* createIterator() {
            let index = 0;
            for (const value of values) {
                yield func(value, index++);
            }
        }
        return ArrayHelper.from(createIterator());
    }
    reduce<R>(func: (result: R, value: T, index?: number) => R, seed: R) {
        let index = 0;
        const values = this.values;
        for (const value of values) {
            seed = func(seed, value, index++);
        }
        return seed;
    }
    valueOf() {
        return Array.from(this.values);
    }
}

