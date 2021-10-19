import { isBuiltin, toMatcher } from '../src'

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

describe('toMatcher', () => {
  it('converts strings to RE', () => {
    const input = 'abracadabra'
    expect(toMatcher(input).test('abracadabra')).toBeTruthy()
  })
  it('does not convert RE to RE', () => {
    const input = /a/
    expect(toMatcher(input)).toBe(input)
  })
  it('does not convert functions to RE', () => {
    const input = () => true
    expect(toMatcher(input)).toBe(input)
  })
})
