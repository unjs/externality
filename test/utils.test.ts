import { toMatcher } from '../src'

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
