import subject from '../../lib/getResourceType'

describe('dotcom-ui-shell/src/lib/getResourceType', () => {
  it('uses the file extension to match to a resource type', () => {
    expect(subject('style.css')).toEqual('style')
    expect(subject('script.js')).toEqual('script')
    expect(subject('image.png')).toEqual('image')
    expect(subject('font.woff')).toEqual('font')
    expect(subject('font.woff2')).toEqual('font')
  })

  it('throws if the file extension cannot be matched', () => {
    expect(() => subject('style.doc')).toThrow()
  })

  it('supports URLs', () => {
    expect(subject('www.example.com/assets/style.css')).toEqual('style')
    expect(subject('www.example.com/images/graphic.svg#icon')).toEqual('image')
    expect(subject('http://polyfill.io/v3/bundle.min.js?features=es5,es6')).toEqual('script')
  })

  it('supports file paths', () => {
    expect(subject('/assets/public/style.as83hd99.css')).toEqual('style')
  })
})
