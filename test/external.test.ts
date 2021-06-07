import * as upath from 'upath'
import { isExternal } from '../src/externals'

const fixtureDir = upath.resolve(__dirname, 'fixture')
// const r = (...p) => upath.resolve(fixtureDir, ...p)

describe('isExternal', () => {
  const inputs: Array<{ input: Parameters<typeof isExternal>, output: any }> = [
    {
      input: ['?test', fixtureDir],
      output: null
    },
    {
      input: ['vue', fixtureDir, { external: ['vue'] }],
      output: {
        id: 'vue',
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
      input: ['esm', fixtureDir],
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
