
export function enumValues<T extends object>(enumObject: T): (T[keyof T])[] {
  return Object.values(enumObject).filter(v => typeof v === "number") as any;
}

export function enumKeys<T extends object>(enumObject: T): string[] {
  return Object.values(enumObject).filter(v => typeof v === "string") as string[];
}
