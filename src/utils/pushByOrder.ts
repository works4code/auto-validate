export function pushByOrder<T= any>(collection: T[], value: T, orderBy: keyof T) {
    for (let index = 0, length = collection.length; index < length; index++) {
        if (value[orderBy] <= collection[index][orderBy]) {
            collection.splice(index, 0, value);
            return collection;
        }
    }
    collection.push(value);
    return collection;
}
