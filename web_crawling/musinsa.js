const axios = require("axios"); 
const cheerio = require("cheerio"); 
const log = console.log; 

const getHtml = async () => { 
    try { 
        return await axios.get("https://store.musinsa.com/app/usr/search_ranking"); // axios.get 함수를 이용하여 비동기로 네이버의 html 파일을 가져온다. 
    } 
    catch (error) { 
        console.error(error); 
    } 
}; 

getHtml() 
    .then(html => { 
        let ulList = []; 
        const $ = cheerio.load(html.data); 
        const $bodyList = $("ol.sranking_list").children("li"); 
        $bodyList.each(function(i, elem) { 
            const text = $(this).find('p.p_srank').text();
            const keyWord = text.substring(5, text.length);
            ulList[i] = { 
                keyWord
            }
        });  
        return ulList
    }) 
    .then(res => log(res));
