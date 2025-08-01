function printReport(pages){
    //formats the report into a structured output
    console.log('---------------------------------')
    console.log('Report')
    console.log('---------------------------------')
    const sortedPages = sortPages(pages)
    for(const sortedPage of sortedPages){
        const url = sortedPage[0]
        const hits = sortedPage[1]
        console.log(`Found ${hits} links to page: ${url}`)
    }
    console.log('---------------------------------')
    console.log('End Report')
    console.log('----------------------------------')
}


function sortPages(pages){
    const pagesArr = Object.entries(pages)
    pagesArr.sort((a,b)=>{
        return b[1]-a[1]
    })
    return pagesArr
}

module.exports = {
    sortPages,
    printReport
}