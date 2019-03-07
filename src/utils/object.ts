import { ArrayHelper } from "./array";

export class ObjectHelper<T=any> {
    protected value: T;
    constructor(value: T) {
        this.value = value;
    }
    static from<T=any>(value: T) {
        return new ObjectHelper(value);
    }
    keys(): ArrayHelper<string> {
        const value = this.value;
        function* createIterator() {
            for (const key in value) {
                yield key;
            }
        }
        return ArrayHelper.from(createIterator());
    }
}