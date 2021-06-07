import type { Plugin } from 'rollup'
import { ExternalsOptions, isExternal } from './externals'

export function rollupExternals (opts: ExternalsOptions): Plugin {
  return {
    name: 'node-externals',
    resolveId (id, importer) {
      return isExternal(id, importer, opts)
    }
  }
}
