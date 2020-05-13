const cheerio = require("cheerio");
const axios = require("axios");
const Parser = require('./parser');

/* 
  Function to get title links and match them to keywords.

  @param keywords - object literal of keywords with each word set to true.
  @return array - array of object literals where each object is a matched link
  with a title and a link property.
*/
function matchLinks(keywords) {
  const urlArr = [
    "https://old.reddit.com/r/vinylreleases",
    "https://old.reddit.com/r/VinylReleases/?count=25&after=t3_ehlmpi",
    "https://old.reddit.com/r/VinylReleases/?count=50&after=t3_eemh1e"
  ];

  keywords["lee"] = true;
  
  const links = [];

  for (let i = 0; i < urlArr.length; i++) {
    axios.get(urlArr[i]).then(response => {

      const $ = cheerio.load(response.data);
      const result = {};

      // Loop through all the titles in the page
      // Add title, link, and matched keyword if keyword is found in the title
      $("a.title").each((iter, element) => {

        const title = $(element).text();
        const link = $(element).attr("href");
        const titleKeywords = title.split(" ");

        for (let i = 0; i < titleKeywords.length; i++) {
          if (keywords[titleKeywords[i]] === true) {
            console.log("Found a match");
            result = {
              page: i + 1,
              title: title,
              link: link,
              matchedKeyword: titleKeywords[i]
            }
            console.log(result);
          }

        }

        // if (keywords[title]) {
        //   result = {
        //     page: i + 1,
        //     title: title,
        //     link: link
        //   };
        // }
      });

      links.push(result);
    })
  };

  links.forEach(link => {
    console.log(link.page + "\n");
    console.log(link.title + "\n");
    console.log(link.link + "\n");
    console.log("----------------------------------");
  })
};

Parser.getArtists('./wantlist/wantlist.csv')
.then(artists => {
  const keywords = Parser.getkeywords(artists);
  matchLinks(keywords);
})

// matchLinks(keywords);