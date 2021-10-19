import type { ResolveOptions } from './resolve'
import { Matcher, matches, toMatcher } from './utils'
import { resolveId } from './resolve'

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
   * Resolve options (passed directly to [`enhanced-resolve`](https://github.com/webpack/enhanced-resolve))
   */
  resolve?: Partial<ResolveOptions>
}

export const ExternalsDefaults: ExternalsOptions = {
  inline: [
    // Rollup
    // eslint-disable-next-line no-control-regex
    /\x00/,
    // Webpack
    /^!/,
    /^-!/,
    // Common
    /^#/,
    /\?/
  ],
  external: [],
  resolve: {}
}

export async function isExternal (id: string, importer: string, opts: ExternalsOptions = {}): Promise<null | { id: string, external: true}> {
  // Apply defaults
  opts = { ...ExternalsDefaults, ...opts }

  const inlineMatchers = opts.inline.map(toMatcher)
  const externalMatchers = opts.external.map(toMatcher)

  // Create context for matchers
  const ctx = { opts, id, resolved: null }

  // Inline filter on original id
  if (!id || matches(id, inlineMatchers, ctx)) {
    return null
  }

  // External filter on original id
  if (matches(id, externalMatchers, ctx)) {
    return { id, external: true }
  }

  // Resolve id
  const r = ctx.resolved = await resolveId(id, importer, opts.resolve)

  // Inline filter on resolved id and path
  if (matches(r.id, inlineMatchers, ctx) || matches(r.path, inlineMatchers, ctx)) {
    return null
  }

  // Check if resolved is external
  if (r.external || matches(r.id, externalMatchers, ctx) || matches(r.path, externalMatchers, ctx)) {
    return { id: r.id, external: true }
  }

  return null
}
