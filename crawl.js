const{JSDOM} = require('jsdom') //allows us to have html syntax in node.js


async function crawlPage(currentURL){
    console.log(`Actively crawling: ${currentURL}`)
    try{
        //this resp variable contains the info about the response like status code,
        // hearders and the body of the content
        const resp = await fetch(currentURL) 
        if(resp.status>399){ //checks the HTTP status code of the response
            console.log(`error in fetch with status code: ${resp.status} on page ${currentURL}`)
            return
        }
        //checking the Content-type header, and if not HTML doc, logs error and stops process
        const contentType = resp.headers.get("content-type")
        if(!contentType.includes("text/html")){
            console.log(`Non-html response, content type: ${contentType} on page ${currentURL}`)
            return
        }

        console.log(await resp.text())// the .text() method returns a promise so gotta use await
    }catch(err){
        console.log(`Invalid URL provided: ${err.message}`)
    }
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
