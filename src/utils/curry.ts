export function curryRight(fn: Function, ...args: any[]) {
    return function (...innerarguments: any[]) {
        const length = args.length + innerarguments.length;
        if (fn.length === length) {
            return fn.apply(this, [...innerarguments, ...args]);
        } else if (fn.length > length) {
            return curryRight(fn, [...innerarguments, ...args])
        } else {
            const subarguments = innerarguments.slice(0, fn.length - args.length);
            return fn.apply(this, [...subarguments, ...args])
        }
    }
}