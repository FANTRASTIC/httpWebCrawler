const {crawlPage} = require('./crawl.js')


function main(){
    if(process.argv.length<3){
        console.log("no website provided") 
        process.exit(1)
    }else if(process.argv.length>3){
        console.log("too much arguments provided")
        process.exit(1)
    }
    const baseURL = process.argv[2];
    console.log(`Starting Crawler of ${baseURL}`);
    crawlPage(baseURL)
}
main()