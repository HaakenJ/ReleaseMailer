const cheerio = require("cheerio");
const axios = require("axios");
const Parser = require('./parser');

/* 
  Function to get title links and match them to keywords.

  @param keywords - object literal of keywords with each word set to true.
  @return array - array of object literals where each object is a matched link
  with a title and a link property.
*/
const url = "https://old.reddit.com/r/vinylreleases";

function matchLinks(keywords, url) {
  const results = [];

  return new Promise ((resolve, reject) => {
    axios.get(url).then(response => {
      const $ = cheerio.load(response.data);
      // Loop through all the titles in the page
      // Add title, link, and matched keyword if keyword is found in the title
      $("a.title").each((iter, element) => {

        const title = $(element).text();
        const link = $(element).attr("href");
        const titleKeywords = title.split(" ");

        for (const word of titleKeywords) {
          if (keywords[word] === true) {
            const match = {
              title: title,
              link: link,
              matchedKeyword: word
            }
            console.log(match);
            results.push(match);
          }
        }
      })
    })
    resolve(results);
  })
};

Parser.getArtists('./wantlist/wantlist.csv')
.then(artists => {
  const keywords = Parser.getkeywords(artists);
  matchLinks(keywords, url)
  .then(matches => {
    for (const match of matches) {
      console.log(match);
    }
  })
})

// matchLinks(keywords);