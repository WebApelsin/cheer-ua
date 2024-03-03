
export default function groupBy<T>(arr: T[], keySelector: (item: T) => string): { [key: string]: T[] } {
    return arr.reduce((result, item) => {
        const key = keySelector(item);
        const group = result[key] || [];

        group.push(item);
        result[key] = group;

        return result;
    }, {} as { [key: string]: T[] });
}