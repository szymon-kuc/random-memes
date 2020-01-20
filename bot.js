const fs = require("fs");
const puppeteer = require('puppeteer');
const request = require("request");

var download = function (uri, filename, callback) {
    request.head(uri, function (err, res, body) {
        console.error('ERROR525: ', err)
        console.log('content-type:', res.headers['content-type']);
        console.log('content-length:', res.headers['content-length']);
        try {
            request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
        }
        catch(err){
            console.log("ERR");
        }
        
    });
}; 


const bot = async () => {
    console.log("running...");
    const browser = await puppeteer.launch();
    try {
        const jeja = await browser.newPage();

        await jeja.goto('https://memy.jeja.pl/losowe', {waitUntil: 'networkidle2'});
        await jeja.setDefaultNavigationTimeout(12000); 



        await jeja.reload({ waitUntil: ["networkidle0", "domcontentloaded"] });
        await jeja.waitForSelector('.ob-left-images');
        
        const memes = await jeja.$$eval('.ob-image-j', link => { return link.map(src => src.src).slice(0,8) });

        const upVotes = await jeja.$$eval('.cnt_votes_up', votes => { return votes.map(vote => parseInt(vote.innerHTML) )});

        let bestMeme = memes[0];
        let max =0;
        for(let i=0; i<=upVotes.length; i++){
                if(upVotes[i] > max){
                    max = upVotes[i];
                    bestMeme = memes[i];
                }
        }

        await download(bestMeme, 'meme2.png', function () {
            console.log('done');
        });

        await browser.close();
    }

    catch (err){
        console.error("Perr: ", err.message);
        await browser.close();
        bot();
    }  
    
};

bot();  
