import { isNil } from "./isNil";

function getValue(path: string, params: object & Record<string, any>): any {
    let value = params;
    const pathes = path.split('.');
    let index = 0;
    let length = pathes.length;
    for (; index < length; index++) {
        const path = pathes[index];
        if (!isNil(value)) {
            value = value[path];
            continue;
        } else {
            break;
        }
    }
    return index === length ? value : undefined;
}

export function format(template: string, params: object & Record<string, any>): string {
    const cache: Record<string, string> = {};
    const result = template.replace(/\{([^\{]+?)}/g, function (_, substring) {
        if (substring in cache) {
            return cache[substring];
        } else {
            let value = getValue(substring, params);
            value = isNil(value) ? '' : value;
            cache[substring] = value;
            return value;
        }
    });
    return result;
}