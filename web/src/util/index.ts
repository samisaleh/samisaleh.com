export const flatDeep = function<T>(arr: T[], d = 1): T[] {
    return d > 0
        ? arr.reduce((acc: T[], val) => acc.concat(Array.isArray(val) ? flatDeep(val, d - 1) : val), [])
        : arr.slice();
};
