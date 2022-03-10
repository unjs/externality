import { describe, it, expect } from 'vitest'
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
  it('does not match nested node_modules', () => {
    const input = 'my-module'
    expect(toMatcher(input).test('node_modules/my-module')).toBeTruthy()
    expect(toMatcher(input).test('my-module')).toBeTruthy()
    expect(
      toMatcher(input).test('node_modules/my-module/index.js')
    ).toBeTruthy()
    expect(
      toMatcher(input).test('node_modules/my-module/node_modules/other-module')
    ).toBeFalsy()
  })
  it('matches namespaced paths', () => {
    const input = '@namespace/my-module'
    expect(toMatcher(input).test('node_modules/@namespace/my-module/dist/index.mjs')).toBeTruthy()
  })
  it('matches pnpm paths', () => {
    const input = '@namespace/my-module'
    expect(toMatcher(input).test('node_modules/.pnpm/@namespace+my-module@1.0.0/dist/index.mjs')).toBeTruthy()
  })
})
