let request = require('request');
let cheerio = require('cheerio');
let fs = require('fs');

let requestPorts = async ()=>{
    for(let y = 1; y< 386; y++) {
        await request("testtest"+ y +"/per_page:50", async (err, response, body) => {
            if (!err) {
                let $ = cheerio.load(body, {
                    normalizeWhitespace: true
                });
                for(let i = 2; i < 52; i ++) {
                    let a = $("body > main > div > div > div:nth-child(1) > div:nth-child(5) > div.filters_results > div:nth-child(2) > div > div.mt-table.mt-table-responsive > table > tbody > tr:nth-child(" + i + ") > td:nth-child(2) > a");
                    try {
                        let res = unescape(a[0].attribs.href);
                        let idPort = res.split("/")[5];
                        let Country = (res.split("/")[6]).split("_")[0];
                        let port = (res.split("/")[6]).split(":")[1];
                        let result = idPort + "/" + Country + "/" + port + "\n";
                        console.log(result);
                        fs.appendFileSync("ports.txt", result)
                    } catch (e) {
                        if(e){
                            console.error(e.message)
                        }
                    }
                }
            }
        });
    }
};


requestPorts()
