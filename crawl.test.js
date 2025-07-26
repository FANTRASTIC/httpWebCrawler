const {normalizeURL, getURLsFromHTML} = require('./crawl.js')
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

test('getURLsFromHTML absolute urls', () => {
    const inputHTMLBody = `
    <html>
        <body>
            <a href = "https://blog.boot.dev/">
                Boot.dev blog
            </a>
        </body>
    </html>
    `
    const inputBaseURL = "https://blog.boot.dev"
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL)
    const expected = ["https://blog.boot.dev/"]
    expect(actual).toEqual(expected)
})

test('getURLsFromHTML relative urls', () => {
    const inputHTMLBody = `
    <html>
        <body>
            <a href = "/path/">
                Boot.dev blog
            </a>
        </body>
    </html>
    `
    const inputBaseURL = "https://blog.boot.dev"
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL)
    const expected = ["https://blog.boot.dev/path/"]
    expect(actual).toEqual(expected)
})

test('getURLsFromHTML both url', () => {
    const inputHTMLBody = `
    <html>
        <body>
            <a href = "/path1/">
                Boot.dev blog path 1
            </a>
            <a href = "/path2/">
                Boot.dev blog path 2
            </a>
        </body>
    </html>
    `
    const inputBaseURL = "https://blog.boot.dev"
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL)
    const expected = ["https://blog.boot.dev/path1/", "https://blog.boot.dev/path2/"]
    expect(actual).toEqual(expected)
})