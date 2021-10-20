import * as upath from 'upath'
import { resolveId } from '../src'

const fixtureDir = upath.resolve(__dirname, 'fixture')
const r = (...p) => upath.resolve(fixtureDir, ...p)

describe('resolveId', () => {
  const inputs: Array<{ input: Parameters<typeof resolveId>, output: any }> = [
    {
      input: ['esm', fixtureDir, {}],
      output: {
        path: r('node_modules/esm/index.js')
      }
    },
    {
      input: ['esm', fixtureDir, { conditionNames: ['import'] }],
      output: {
        path: r('node_modules/esm/index.mjs')
      }
    },
    {
      input: ['esm/index.cjs', fixtureDir, { type: 'module' }],
      output: {
        type: 'commonjs'
      }
    },
    {
      input: ['file://' + r('node_modules/esm'), fixtureDir, {}],
      output: {
        path: r('node_modules/esm/index.js')
      }
    },
    {
      input: ['fs'],
      output: {
        path: 'fs',
        external: true
      }
    },
    {
      input: ['https://test.com/index.js', fixtureDir, {}],
      output: {
        path: '/index.js',
        id: 'https://test.com/index.js'
      }
    },
    {
      input: ['./node_modules/esm', fixtureDir, {}],
      output: {
        path: r('node_modules/esm/index.js')
      }
    },
    {
      input: ['esm/package.json', fixtureDir, { type: 'module' }],
      output: {
        path: r('node_modules/esm/package.json')
      }
    },
    {
      input: ['esm', fixtureDir, { type: 'module' }],
      output: {
        path: r('node_modules/esm/index.mjs')
      }
    },
    {
      input: ['../../a.js', r('src/foo/bar'), { type: 'module' }],
      output: {
        path: r('src/a.js')
      }
    },
    {
      input: ['esm-only', fixtureDir],
      output: {
        type: 'unknown'
      }
    },
    {
      input: ['esm', '\x00virtual:#polyfill', { roots: [fixtureDir] }],
      output: {
        path: r('node_modules/esm/index.js')
      }
    }
  ]

  for (const item of inputs) {
    test(`'resolveId(${item.input.map(i => JSON.stringify(i)).join(', ')}) => ${JSON.stringify(item.output)}`, async () => {
      // @ts-ignore
      // eslint-disable-next-line no-console
      expect(await resolveId(...item.input).catch(console.log)).toMatchObject(item.output)
    })
  }
})
