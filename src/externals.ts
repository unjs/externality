import { extname } from "pathe";
import { isValidNodeImport } from "mlly";
import type { ResolveOptions } from "./resolve";
import { getProtocol, Matcher, matches, toMatcher } from "./utils";
import { resolveId } from "./resolve";

export interface ExternalsOptions {
  /**
   * Patterns that always will be excluded from externals
   */
  inline?: Array<string | Matcher>
  /**
   * Patterns that match if an id/module is external
   */
  external?: Array<string | Matcher>
  /**
   * Protocols that are allowed to be externalized.
   * Any other matched protocol will be inlined.
   *
   * Default: ['node', 'file', 'data']
   */
  externalProtocols?: Array<string>
  /**
   * Extensions that are allowed to be externalized.
   * Any other matched extension will be inlined.
   *
   * Default: ['.js', '.mjs', '.cjs', '.node']
   */
  externalExtensions?: Array<string>
  /**
   * Resolve options (passed directly to [`enhanced-resolve`](https://github.com/webpack/enhanced-resolve))
   */
  resolve?: Partial<ResolveOptions>
  /**
   * Try to automatically detect and inline invalid node imports
   * matching file name (at first) and then loading code.
   */
  detectInvalidNodeImports?: boolean
}

export const ExternalsDefaults: ExternalsOptions = {
  inline: [
    // Rollup
    // eslint-disable-next-line no-control-regex
    /\u0000/,
    // Webpack
    /^!/,
    /^-!/,
    // Common
    /^#/,
    /\?/
  ],
  external: [],
  externalProtocols: ["node", "file", "data"],
  externalExtensions: [".js", ".mjs", ".cjs", ".node"],
  resolve: {},
  detectInvalidNodeImports: true
};

export async function isExternal (id: string, importer: string, options: ExternalsOptions = {}): Promise<null | { id: string, external: true }> {
  // Apply defaults
  options = { ...ExternalsDefaults, ...options };

  const inlineMatchers = options.inline.map(p => toMatcher(p as any));
  const externalMatchers = options.external.map(p => toMatcher(p as any));

  // Create context for matchers
  const context = { opts: options, id, resolved: null };

  // Inline filter on original id
  if (!id || matches(id, inlineMatchers, context)) {
    return null;
  }

  // Inline not allowed protocols
  const proto = getProtocol(id);
  if (proto && !options.externalProtocols.includes(proto)) {
    return null;
  }

  if (proto === "data") {
    return { id, external: true };
  }

  // Resolve id
  const r = context.resolved = await resolveId(id, importer, options.resolve).catch(() => {
    return { id, path: id, external: null };
  });

  // Inline not allowed extensions
  const idExtension = extname(r.path);
  if (idExtension && !options.externalExtensions.includes(idExtension)) {
    return null;
  }

  // Inline filter on resolved id and path
  if (matches(r.id, inlineMatchers, context) || matches(r.path, inlineMatchers, context)) {
    return null;
  }

  // Check if resolved is external
  if (
    r.external ||
    matches(id, externalMatchers, context) ||
    matches(r.id, externalMatchers, context) ||
    matches(r.path, externalMatchers, context)
  ) {
    // Inline invalid node imports
    if (options.detectInvalidNodeImports && !await isValidNodeImport(r.path)) {
      return null;
    }

    return { id: r.id, external: true };
  }

  return null;
}
