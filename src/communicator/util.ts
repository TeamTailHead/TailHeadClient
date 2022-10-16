export const notInitializedObject = <T extends object>(name: string) =>
  new Proxy(
    {},
    {
      get() {
        throw new Error(`${name} not initialized`);
      },
    }
  ) as T;

export function parseConnectionURL(url: string) {
  const re = /(.+):(\d+)/;
  const match = url.match(re);

  if (!match) {
    throw new Error("Invalid connection URL");
  }

  return {
    host: match[1],
    port: parseInt(match[2], 10),
  };
}
