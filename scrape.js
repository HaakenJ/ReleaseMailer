const cheerio = require("cheerio");
const axios = require("axios");

/* 
  Function to get title links and match them to keywords.

  @param keywords - object literal of keywords with each word set to true.
  @return array - array of object literals where each object is a matched link
  with a title and a link property.
*/

const matchLinks = (keywords, url) => {
  const results = [];

  // I added these specific keywords manually because I like the light in the attic
  // label's releases and am always looking for Japanese albums.
  keywords["lita"] = true;
  keywords["attic"] = true;
  keywords["japan"] = true;
  keywords["japanese"] = true;

  return new Promise(resolve => {
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
              results.push(match);
            }
          }
        })
      })
      .then(() => resolve(results));
  })
};

module.exports = matchLinks;