import * as subject from '../polyfillServiceURLs'

describe('dotcom-ui-polyfill-service', () => {
  it('provides both core and enhanced URLs', () => {
    expect(typeof subject.core()).toBe('string')
    expect(typeof subject.enhanced()).toBe('string')
  })

  it('joins all of the configured features', () => {
    expect(subject.core()).toMatch(/features=HTMLPictureElement/)
    expect(subject.enhanced()).toMatch(/features=default%2Ces5%2Ces2015/)
  })

  it('appends the source to each URL', () => {
    expect(subject.core()).toMatch(/source=next/)
    expect(subject.enhanced()).toMatch(/source=next/)
  })
})
