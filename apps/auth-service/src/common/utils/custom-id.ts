export function customUserId(prefix: string): string {
  return (
    prefix +
    '_' +
    Date.now().toString(36) +
    Math.random().toString(36).substring(2, 10)
  );
}
