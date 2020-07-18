export const castString = (value: unknown): string | undefined => {
  if (typeof value === undefined) return undefined;
  if (typeof value === "string") return value;
  if (typeof value === "number" || typeof value === "boolean")
    return value.toString();
  return undefined;
};

export const castNumber = (value: unknown): number | undefined => {
  if (typeof value === undefined) return undefined;
  if (typeof value === "number") return value;
  if (typeof value === "string") {
    const num = Number(value);
    if (Number.isNaN(num)) {
      return undefined;
    } else {
      return num;
    }
  }
  return undefined;
};
