function escapeValue(value: string | number | Date | null | undefined) {
  if (value === null || value === undefined) return "";
  const str = value instanceof Date ? value.toISOString() : String(value);
  if (/[",\n]/.test(str)) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

export function toCsv<
  T extends Record<string, string | number | Date | null | undefined>
>(
  rows: T[],
  headers: Array<keyof T>
) {
  const headerLine = headers.join(",");
  const lines = rows.map((row) => headers.map((key) => escapeValue(row[key])).join(","));
  return [headerLine, ...lines].join("\n");
}

