const {normalizeURL} = require('./crawl.js')
const {test, expect} = require('@jest/globals')

// The test run here are all to get to the same url, given the input URL
//It converts all into a single URL that leads to that page

test('normalizeURL strip protocol', () => {
    const input = 'https://blog.boot.dev/path' //this input results to ---
    const actual = normalizeURL(input)
    const expected = 'blog.boot.dev/path'//---this output
    expect(actual).toEqual(expected)
})

test('normalizeURL trailing test', () => {
    const input = 'https://blog.boot.dev/path/' //this input results to---
    const actual = normalizeURL(input)
    const expected = 'blog.boot.dev/path'//----this output
    expect(actual).toEqual(expected)
})

test('normalizeURL case insensetive', () => {
    const input = 'https://BLOG.boot.dev/path'
    const actual = normalizeURL(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
})

test('normalizeURL strip http', () => {
    const input = 'http://blog.boot.dev/path'
    const actual = normalizeURL(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
})