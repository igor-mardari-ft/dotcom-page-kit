import Handlebars from 'handlebars'
import * as helpers from '../helpers'

describe('anvil-server-handlebars/src/helpers', () => {
  describe('block helpers', () => {
    describe('#dateformat', () => {
      const date = new Date('2019-04-10 13:40:21')

      it('formats as ISO date time by default', () => {
        const template = Handlebars.compile('{{#dateformat}}{{date}}{{/dateformat}}')
        const result = template({ date }, { helpers })

        expect(result).toBe('2019-04-10T12:40:21Z')
      })

      it('formats using the given format', () => {
        const template = Handlebars.compile('{{#dateformat "dddd, mmmm d, yyyy"}}{{date}}{{/dateformat}}')
        const result = template({ date }, { helpers })

        expect(result).toBe('Wednesday, April 10, 2019')
      })
    })

    describe('#ifAll', () => {
      const template = Handlebars.compile('{{#ifAll foo bar baz}}yes{{else}}no{{/ifAll}}')

      it('outputs the contents when all parameters are truthy', () => {
        const result = template({ foo: 123, bar: 'abc', baz: true }, { helpers })
        expect(result).toBe('yes')
      })

      it('does not output the contents if any parameters are falsy', () => {
        const result = template({ foo: 123, bar: 'abc', baz: false }, { helpers })
        expect(result).toBe('no')
      })

      it('throws if the incorrect number of parameters are provided', () => {
        const template = Handlebars.compile('{{#ifSome}}yes{{/ifSome}}')
        expect(() => template({}, { helpers })).toThrow()
      })
    })

    describe('#ifEquals', () => {
      const template = Handlebars.compile('{{#ifEquals foo bar}}yes{{else}}no{{/ifEquals}}')

      it('outputs the contents parameters are strictly equal', () => {
        const result = template({ foo: true, bar: true }, { helpers })
        expect(result).toBe('yes')
      })

      it('does not output the contents if any parameter is not strictly equal', () => {
        const result = template({ foo: true, bar: null }, { helpers })
        expect(result).toBe('no')
      })

      it('throws if the incorrect number of parameters are provided', () => {
        const template = Handlebars.compile('{{#ifEquals}}yes{{/ifEquals}}')
        expect(() => template({}, { helpers })).toThrow()
      })
    })

    describe('#ifSome', () => {
      const template = Handlebars.compile('{{#ifSome foo bar baz}}yes{{else}}no{{/ifSome}}')

      it('outputs the contents if at least one parameter is truthy', () => {
        const result = template({ foo: 123, bar: '', baz: false }, { helpers })
        expect(result).toBe('yes')
      })

      it('does not output the contents if all parameters are falsy', () => {
        const result = template({ foo: 0, bar: '', baz: false }, { helpers })
        expect(result).toBe('no')
      })

      it('throws if the incorrect number of parameters are provided', () => {
        const template = Handlebars.compile('{{#ifSome}}yes{{/ifSome}}')
        expect(() => template({}, { helpers })).toThrow()
      })
    })

    describe('#resize', () => {
      it('formats the image as an image service URL', () => {
        const template = Handlebars.compile('{{#resize 640}}http://website.com/picture.jpg{{/resize}}')
        const result = template({}, { helpers })

        expect(result).toBe(
          'https://www.ft.com/__origami/service/image/v2/images/raw/http%3A%2F%2Fwebsite.com%2Fpicture.jpg?width=640&source=next&fit=scale-down'
        )
      })

      it('throws if the incorrect number of parameters are provided', () => {
        const template = Handlebars.compile('{{#resize}}http://website.com/picture.jpg{{/resize}}')
        expect(() => template({}, { helpers })).toThrow()
      })
    })

    describe('#slice', () => {
      it('slices a given array and iterates over the new array', () => {
        const template = Handlebars.compile('{{#slice items offset="2" limit="3"}}{{this}}{{/slice}}')
        const result = template({ items: [1, 2, 3, 4, 5, 6] }, { helpers })

        expect(result).toBe('345')
      })

      it('throws if the incorrect number of parameters are provided', () => {
        const template = Handlebars.compile('{{#slice offset="2" limit="3"}}{{this}}{{/slice}}')
        expect(() => template({}, { helpers })).toThrow()
      })
    })

    describe('#unlessAll', () => {
      const template = Handlebars.compile('{{#unlessAll foo bar baz}}yes{{else}}no{{/unlessAll}}')

      it('outputs the contents if all parameters are falsy', () => {
        const result = template({ foo: 0, bar: '', baz: false }, { helpers })
        expect(result).toBe('yes')
      })

      it('does not output the contents if any parameters are truthy', () => {
        const result = template({ foo: 0, bar: '', baz: true }, { helpers })
        expect(result).toBe('no')
      })

      it('throws if the incorrect number of parameters are provided', () => {
        const template = Handlebars.compile('{{#unlessAll}}yes{{/unlessAll}}')
        expect(() => template({}, { helpers })).toThrow()
      })
    })

    describe('#unlessEquals', () => {
      const template = Handlebars.compile('{{#unlessEquals foo bar}}yes{{else}}no{{/unlessEquals}}')

      it('outputs the contents if all parameters are falsy', () => {
        const result = template({ foo: true, bar: false }, { helpers })
        expect(result).toBe('yes')
      })

      it('does not output the contents if any parameters are truthy', () => {
        const result = template({ foo: true, bar: true }, { helpers })
        expect(result).toBe('no')
      })

      it('throws if the incorrect number of parameters are provided', () => {
        const template = Handlebars.compile('{{#unlessEquals}}yes{{/unlessEquals}}')
        expect(() => template({}, { helpers })).toThrow()
      })
    })

    describe('#unlessSome', () => {
      const template = Handlebars.compile('{{#unlessSome foo bar baz}}yes{{else}}no{{/unlessSome}}')

      it('outputs the contents if any parameters are falsy', () => {
        const result = template({ foo: 1, bar: 'abc', baz: false }, { helpers })
        expect(result).toBe('yes')
      })

      it('does not output the contents if all parameters are truthy', () => {
        const result = template({ foo: 1, bar: 'abc', baz: true }, { helpers })
        expect(result).toBe('no')
      })

      it('throws if the incorrect number of parameters are provided', () => {
        const template = Handlebars.compile('{{#unlessSome}}yes{{/unlessSome}}')
        expect(() => template({}, { helpers })).toThrow()
      })
    })
  })

  describe('inline helpers', () => {
    describe('array', () => {
      it('converts all parameters into one array', () => {
        const template = Handlebars.compile('{{array foo bar baz}}')
        const result = template({ foo: 1, bar: 2, baz: 3 }, { helpers })

        expect(result).toBe('1,2,3')
      })

      it('throws if the incorrect number of parameters are provided', () => {
        const template = Handlebars.compile('{{array}}')
        expect(() => template({}, { helpers })).toThrow()
      })
    })

    describe('concat', () => {
      it('concatenates all parameters into one string', () => {
        const template = Handlebars.compile('{{concat "Welcome to " place ", " name}}')
        const result = template({ place: 'Hell', name: 'human' }, { helpers })

        expect(result).toBe('Welcome to Hell, human')
      })

      it('throws if the incorrect number of parameters are provided', () => {
        const template = Handlebars.compile('{{concat}}')
        expect(() => template({}, { helpers })).toThrow()
      })
    })

    describe('json', () => {
      it('stringifies the parameter', () => {
        const template = Handlebars.compile('{{{json data}}}')
        const result = template({ data: { foo: 'bar', baz: 123, qux: true } }, { helpers })

        expect(result).toBe('{"foo":"bar","baz":123,"qux":true}')
      })

      it('throws if the incorrect number of parameters are provided', () => {
        const template = Handlebars.compile('{{json}}')
        expect(() => template({}, { helpers })).toThrow()
      })

      it('throws if the user tries to output the @root context', () => {
        const template = Handlebars.compile('{{json data}}')
        expect(() => template({ data: { _locals: true } }, { helpers })).toThrow()
      })
    })
  })
})
