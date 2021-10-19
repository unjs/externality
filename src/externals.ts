import type { ResolveOptions } from './resolve'
import { Matcher, matches } from './utils'
import { resolveId } from './resolve'

export interface ExternalsOptions {
  /**
   * Patterns that always will be excluded from externals
   */
  inline?: Matcher[]
  /**
   * Patterns that match if an id/module is external
   */
  external?: Matcher[]
  /**
   * Resolve options (passed directly to [`enhanced-resolve`](https://github.com/webpack/enhanced-resolve))
   */
  resolve?: Partial<ResolveOptions>
}

export const ExternalsDefaults: ExternalsOptions = {
  inline: [
    // Rollup
    '\x00',
    // Webpack
    /^!/,
    /^-!/,
    // Common
    /^#/,
    '?'
  ],
  external: [],
  resolve: {}
}

export const toPathRegExp = (pattern: string | RegExp) => pattern instanceof RegExp ? pattern : new RegExp(`([\\/]|^)${pattern}([\\/]|$)`)

export async function isExternal (id: string, importer: string, opts: ExternalsOptions = {}): Promise<null | { id: string, external: true}> {
  // Apply defaults
  opts = { ...ExternalsDefaults, ...opts }

  // Create context for matchers
  const ctx = { opts, id, resolved: null }

  // Inline filter on original id
  if (!id || matches(id, opts.inline, ctx)) {
    return null
  }

  // External filter on original id
  if (matches(id, opts.external, ctx)) {
    return { id, external: true }
  }

  // Resolve id
  const r = ctx.resolved = await resolveId(id, importer, opts.resolve)

  // Inline filter on resolved id and path
  if (matches(r.id, opts.inline, ctx) || matches(r.path, opts.inline, ctx)) {
    return null
  }

  // Check if resolved is external
  if (r.external || matches(r.id, opts.external, ctx) || matches(r.path, opts.external, ctx)) {
    return { id: r.id, external: true }
  }

  return null
}
