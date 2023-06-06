import { fileURLToPath } from "node:url";
import { promisify } from "node:util";
import { hasProtocol } from "ufo";
import enhancedResolve from "enhanced-resolve";
import { isNodeBuiltin } from "mlly";
import type { ResolveOptions as EnhancedResolveOptions } from "enhanced-resolve";
import { getType } from "./utils";

export type ModuleType = "commonjs" | "module" | "unknown"

export interface ResolveOptions extends Partial<EnhancedResolveOptions> {
  /**
   * Whether to resolve esm or cjs by default
   * @default 'commonjs'
   */
  type?: ModuleType
}

export interface ResolvedId {
  id: string
  path: string
  type?: ModuleType
  external?: boolean
}

const DefaultResolveOptions: ResolveOptions = {
  extensions: [".ts", ".mjs", ".cjs", ".js", ".json"],
  type: "commonjs"
};

export async function resolveId (id: string, base = ".", options: ResolveOptions = {}): Promise<ResolvedId> {
  options = { ...DefaultResolveOptions, ...options };

  // Set condition names based on resolve type
  if (!options.conditionNames) {
    options.conditionNames = [options.type === "commonjs" ? "require" : "import"];
  }

  if (isNodeBuiltin(id)) {
    return {
      id: id.replace(/^node:/, ""),
      path: id,
      type: options.type,
      external: true
    };
  }

  // Normalize id with file protocol
  if (id.startsWith("file:/")) {
    // is file URL
    id = fileURLToPath(id);
  }

  if (hasProtocol(id)) {
    const url = new URL(id);
    return {
      id: url.href,
      path: url.pathname,
      type: getType(id, options.type),
      external: true
    };
  }

  //  The argument 'path' must be a string or Uint8Array without null bytes.
  if (base.includes("\u0000")) {
    base = options.roots?.[0] || ".";
  }

  // https://github.com/webpack/enhanced-resolve
  const _resolve: (base: string, id: string) =>
    Promise<string | false> = promisify(enhancedResolve.create(options));

  // TODO: leverage shared cache
  const resolvedModule = await _resolve(base, id);

  return {
    id,
    path: resolvedModule || id,
    type: getType(resolvedModule || id, "unknown")
  };
}
