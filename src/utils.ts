import { builtinModules } from 'module'
import type { ModuleType } from './resolve'

export type Matcher<T = any> = RegExp | string | ((input: string, ctx?: T) => boolean)

export function matches <T = any> (input: string, matchers: Matcher<T>[], ctx?: T) {
  return matchers.some((matcher) => {
    if (typeof matcher === 'string') {
      return input.includes(matcher)
    }
    if (matcher instanceof RegExp) {
      return matcher.test(input)
    }
    if (typeof matcher === 'function') {
      return matcher(input, ctx)
    }
    return false
  })
}

export function isBuiltin (id: string = '') {
  // node:fs/promises => fs
  id = id.replace(/^node:/, '').split('/')[0]
  return builtinModules.includes(id)
}

export function getType (id: string, fallback: ModuleType = 'commonjs'): ModuleType {
  if (id.endsWith('.cjs')) { return 'commonjs' }
  if (id.endsWith('.mjs')) { return 'module' }
  return fallback
}
