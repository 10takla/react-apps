export type Mods = Record<string, boolean | string | undefined>

type Additional = Array<string | undefined>
export function classNames(
    cls: string,
    mods: Mods | Additional = {},
    additional: Mods | Additional = [],
): string {
    if (Array.isArray(mods) || !Array.isArray(additional)) {
        [mods, additional] = [additional, mods];
    }

    return [
        cls,
        ...additional.filter(Boolean),
        ...Object.entries(mods)
            .filter(([_, value]) => Boolean(value))
            .map(([className]) => className),
    ]
        .join(' ');
}
