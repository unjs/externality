import type { Configuration } from 'webpack'
import { ExternalsOptions, isExternal } from './externals'

export function webpackExternals (opts: ExternalsOptions): any {
  const _isExternal: Configuration['externals'] = async ({ request }, cb) => {
    try {
      const res = await isExternal(request, '.' /* TODO */, opts)
      cb(undefined, res && res.id)
    } catch (err) {
      cb(err, null)
    }
  }
  return _isExternal
}
