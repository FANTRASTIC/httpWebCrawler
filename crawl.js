const{JSDOM} = require('jsdom') //allows us to have html syntax in node.js


//three arguments
//currentURL, baseURL, pages
//baseURL homepage of the website 
//currentURL page that we are actively crawling
//pages object keep tracks of all the pages we have tracked

async function crawlPage(baseURL, currentURL, pages){
    //check if the currentURL is in the same domain as the baseURL
    const baseURLObj = new URL(baseURL)
    const currentURLObj = new URL(currentURL)
    if(baseURLObj.hostname !== currentURLObj.hostname){
        return pages;
    }
    
    const normalizedCurrentURL = normalizeURL(currentURL);

    //if the pages are crawled, it shows the number of times it has seen the pages 
    //helps tell the user how many times a page is linked to in the site
    if(pages[normalizedCurrentURL]>0){
        pages[normalizedCurrentURL]++
        return pages
    }
    
    pages[normalizedCurrentURL] = 1

    console.log(`Actively crawling: ${currentURL}`)



    try{
        //this resp variable contains the info about the response like status code,
        // hearders and the body of the content
        const resp = await fetch(currentURL) 
        if(resp.status>399){ //checks the HTTP status code of the response
            console.log(`error in fetch with status code: ${resp.status} on page ${currentURL}`)
            return pages
        }
        //checking the Content-type header, and if not HTML doc, logs error and stops process
        const contentType = resp.headers.get("content-type")
        if(!contentType.includes("text/html")){
            console.log(`Non-html response, content type: ${contentType} on page ${currentURL}`)
            return pages
        }
        //assigning a variable to the fetched html
        const htmlBody = await resp.text()// the .text() method returns a promise so gotta use await
        const nextURLs = getURLsFromHTML(htmlBody, baseURL);
        //recursively crawling through the webpage
        for(const nextURL of nextURLs){
            pages = await crawlPage(baseURL, nextURL, pages)
        }

    }catch(err){
        console.log(`Invalid URL provided: ${err.message}`)
    }

    return pages
}




function getURLsFromHTML(htmlBody, baseURL){
    const urls = [];
    const dom = new JSDOM(htmlBody)
    const linkElements = dom.window.document.querySelectorAll('a') // grabs all the anchor tag or link tag 
    for(const linkElement of linkElements){
        if(linkElement.href.slice(0,1)=== '/'){ //evaluates the logic behind having just the /path/ in the url
            //relative url
            try{
                const urlObj = new URL(`${baseURL}${linkElement.href}`);
                urls.push(urlObj.href)
            } catch(err){
                console.log(`The error with relative url was ${err.message}`)
            }
        }else{
            //absolute url
             try{
                const urlObj = new URL(linkElement.href);
                urls.push(urlObj.href)
            } catch(err){
                console.log(`The error with absolute url was ${err.message}`)
            }
        
        }
       
       
    }
    return urls
}

function normalizeURL(urlString){
    const urlObj = new URL(urlString);
    const hostPath =  `${urlObj.hostname}${urlObj.pathname}`
    if(hostPath.length > 0 && hostPath.slice(-1) === '/'){
        return hostPath.slice(0, -1);
    }
    return hostPath;
}
module.exports = {
    normalizeURL,
    getURLsFromHTML,
    crawlPage

}
