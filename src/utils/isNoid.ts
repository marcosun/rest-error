/**
 * Test whether variable is either undefined or null.
 */
export default function isNoid(variable: any) {
  return variable === void 0 || variable === null;
}
