export function isArrayLike(value: any) {
    if (Array.isArray(value) || typeof value === 'string') { return true }
    if (!value) { return false }
    if (typeof value !== 'object') { return false }
    if (value.nodeType === 1) { return !!value.length }
    if (value.length === 0) { return true }
    if (typeof value.length === 'number' && value.length > 0) {
        return '0' in value && `${value.length - 1}` in value;
    }
    return false;
}