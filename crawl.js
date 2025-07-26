const{JSDOM} = require('jsdom') //allows us to have html syntax in node.js


function getURLsFromHTML(htmlBody, baseURL){
    const urls = [];
    const dom = new JSDOM(htmlBody)
    const linkElements = dom.window.document.querySelectorAll('a') // grabs all the anchor tag or link tag 
    for(const linkElement of linkElements){
        if(linkElement.href.slice(0,1)=== '/'){
            //absolute url
            urls.push(`${baseURL}${linkElement.href}`)
        }else{
            //relative url
            urls.push(linkElement.href)
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
    getURLsFromHTML
}