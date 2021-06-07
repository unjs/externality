import { isBuiltin } from '../src'

describe('isBuiltin', () => {
  const cases = {
    fs: true,
    fake: false,
    'node:fs': true,
    'node:fake': false,
    'fs/promises': true,
    'fs/fake': true // invalid import
  }

  for (const id in cases) {
    test(`'${id}': ${cases[id]}`, () => {
      expect(isBuiltin(id)).toBe(cases[id])
    })
  }

  test('undefined', () => {
    expect(isBuiltin()).toBe(false)
  })
})
