export function jsonParse<T>(
  str: string | undefined | null
): T extends Record<any, any> ? T : any {
  try {
    return JSON.parse(str || "{}");
  } catch (err) {
    console.log(err);
    return {} as any;
  }
}
