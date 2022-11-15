import type { Configuration } from "webpack";
import { ExternalsOptions, isExternal } from "./externals";

export function webpackExternals (options: ExternalsOptions): any {
  const _isExternal: Configuration["externals"] = async ({ request }, callback) => {
    try {
      const res = await isExternal(request, "." /* TODO */, options);
      callback(undefined, res && res.id);
    } catch (error) {
      callback(error, null);
    }
  };
  return _isExternal;
}
