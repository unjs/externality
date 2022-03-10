import { pathToFileURL } from 'url'
import { describe, test, expect } from 'vitest'
import { resolve } from 'pathe'
import { isExternal } from '../src/externals'

const fixtureDir = resolve(__dirname, 'fixture')
const r = (...p) => resolve(fixtureDir, ...p)

describe('isExternal', () => {
  const inputs: Array<{ input: Parameters<typeof isExternal>, output: any }> = [
    {
      input: ['?test', fixtureDir],
      output: null
    },
    {
      input: ['vue', fixtureDir, { external: ['vue'], detectInvalidNodeImports: false }],
      output: {
        id: 'vue',
        external: true
      }
    },
    {
      input: ['allowlist', fixtureDir, { external: ['allowlist'] }],
      output: {
        id: 'allowlist',
        external: true
      }
    },
    {
      input: ['esm', fixtureDir, { external: ['node_modules'] }],
      output: {
        id: 'esm',
        external: true
      }
    },
    {
      input: ['esm/index.js', fixtureDir, { external: ['node_modules'] }],
      output: {
        id: 'esm/index.js',
        external: true
      }
    },
    {
      input: [pathToFileURL(r('node_modules/esm')).href, fixtureDir, { external: ['node_modules'] }],
      output: {
        id: r('node_modules/esm'),
        external: true
      }
    },
    {
      input: ['data:text/javascript,console.log("hello!");', fixtureDir, { external: ['node_modules'] }],
      output: {
        id: 'data:text/javascript,console.log("hello!");',
        external: true
      }
    },
    {
      input: ['invalid', fixtureDir, { external: ['node_modules'] }],
      output: null
    },
    {
      input: ['esm', fixtureDir],
      output: null
    },
    {
      input: ['esm', '\x00virtual:#polyfill', { resolve: { roots: [fixtureDir] } }],
      output: null
    },
    {
      input: ['virtual:foo', fixtureDir],
      output: null
    },
    {
      input: ['node:fs', fixtureDir],
      output: { id: 'fs', external: true }
    },
    {
      input: ['esm/index.js', fixtureDir, { external: ['node_modules'] }],
      output: { id: 'esm/index.js', external: true }
    },
    {
      input: ['esm/styles', fixtureDir, { external: ['node_modules'] }],
      output: null
    },
    {
      input: ['esm/styles.css', fixtureDir, { external: ['node_modules'] }],
      output: null
    }
  ]

  for (const item of inputs) {
    test(`'isExternal(${item.input.map(i => JSON.stringify(i)).join(', ')}) => ${JSON.stringify(item.output)}`, async () => {
      if (!item.output) {
        expect(await isExternal(...item.input)).toBeNull()
      } else {
        expect(await isExternal(...item.input)).toMatchObject(item.output)
      }
    })
  }
})
