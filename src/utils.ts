import type { ModuleType } from './resolve'

export type Matcher<T = any> = RegExp | ((input: string, ctx?: T) => boolean)

// 2+ letters, to exclude Windows drive letters
const ProtocolRegex = /^(?<proto>.{2,}):.+$/

export function getProtocol (id: string): string | null {
  const proto = id.match(ProtocolRegex)
  return proto ? proto.groups.proto : null
}

export function matches <T = any> (input: string, matchers: Matcher<T>[], ctx?: T) {
  return matchers.some((matcher) => {
    if (matcher instanceof RegExp) {
      return matcher.test(input)
    }
    if (typeof matcher === 'function') {
      return matcher(input, ctx)
    }
    return false
  })
}

/* eslint-disable no-redeclare */
export function toMatcher (pattern: string): RegExp
export function toMatcher<T> (pattern: Matcher<T>): Matcher<T>
export function toMatcher (pattern: any) {
  return typeof pattern === 'string' ? new RegExp(`([\\/]|^)${pattern}([\\/](?!node_modules)|$)`) : pattern
}

export function getType (id: string, fallback: ModuleType = 'commonjs'): ModuleType {
  if (id.endsWith('.cjs')) { return 'commonjs' }
  if (id.endsWith('.mjs')) { return 'module' }
  return fallback
}
