import { fileURLToPath } from 'url'
import { promisify } from 'util'
import { hasProtocol } from 'ufo'
import enhancedResolve from 'enhanced-resolve'
import { isNodeBuiltin } from 'mlly'
import type { ResolveOptions as EnhancedResolveOptions } from 'enhanced-resolve'
import { getType } from './utils'

export type ModuleType = 'commonjs' | 'module' | 'unknown'

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
  extensions: ['.ts', '.mjs', '.cjs', '.js', '.json'],
  type: 'commonjs'
}

export async function resolveId (id: string, base: string = '.', opts: ResolveOptions = {}): Promise<ResolvedId> {
  opts = { ...DefaultResolveOptions, ...opts }

  // Set condition names based on resolve type
  if (!opts.conditionNames) {
    opts.conditionNames = [opts.type === 'commonjs' ? 'require' : 'import']
  }

  // Normalize id with file protocol
  if (id.startsWith('file:/')) {
    // is file URL
    id = fileURLToPath(id)
  }

  if (hasProtocol(id)) {
    const url = new URL(id)
    return {
      id: url.href,
      path: url.pathname,
      type: getType(id, opts.type),
      external: true
    }
  }

  if (isNodeBuiltin(id)) {
    return {
      id: id.replace(/^node:/, ''),
      path: id,
      type: opts.type,
      external: true
    }
  }

  //  The argument 'path' must be a string or Uint8Array without null bytes.
  if (base.includes('\x00')) {
    base = opts.roots?.[0] || '.'
  }

  // https://github.com/webpack/enhanced-resolve
  const _resolve: (base: string, id: string) =>
    Promise<string> = promisify(enhancedResolve.create(opts))

  // TODO: leverage shared cache
  const resolvedModule = await _resolve(base, id)

  return {
    id,
    path: resolvedModule,
    type: getType(resolvedModule, 'unknown')
  }
}
