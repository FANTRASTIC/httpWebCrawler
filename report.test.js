const{sortPages} = require('./report.js')
const{test, expect} = require('@jest/globals')

test('sortPages 2 pages', ()=>{
    const input = {
        'https://wagslane.dev/path':1,
        'https://wagslane.dev':3
    }
    const actual = sortPages(input)
    const expected = [
        ['https://wagslane.dev',3],
        ['https://wagslane.dev/path',1]
    ]
    expect(actual).toEqual(expected)
})

test('sort pages 5',()=>{
    const input = {
        'https://wagslane.dev':1,
        'https://wagslane.dev/path3':5,
        'https://wagslane.dev/path': 3,
        'https://wagslane.dev/path5':7,
        'https://wagslabe.dev/path4':8
    }
    const actual = sortPages(input)
    const expected = [
        ['https://wagslabe.dev/path4',8],
        ['https://wagslabe.dev/path5',7],
        ['https://wagslabe.dev/path3',5],
        ['https://wagslabe.dev/path',3],
        ['https://wagslabe.dev',1]
    ]
})

