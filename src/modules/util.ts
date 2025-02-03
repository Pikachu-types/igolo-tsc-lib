/* es-lint disable */

export const removeAllIdentifiers = function (url: string | undefined) {
  if (url === undefined || url === null || !url.includes("_")) return "";
  return url.split("_")[1];
};
