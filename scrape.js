// Using this template, the cheerio documentation,
// and what you've learned in class so far, scrape a website
// of your choice, save information from the page in a result array, and log it to the console.

const cheerio = require("cheerio");
const axios = require("axios");
const artists = require('./parser');

/* 
  Function to get title links and match them to keywords.

  @param keywords - object literal of keywords with each word set to true.
  @return array - array of object literals where each object is a matched link
  with a title and a link property.
*/
function matchLinks(filter) {
  const urlArr = [
    "https://old.reddit.com/r/vinylreleases",
    "https://old.reddit.com/r/VinylReleases/?count=25&after=t3_ehlmpi",
    "https://old.reddit.com/r/VinylReleases/?count=50&after=t3_eemh1e"
  ];

  let links = [];

  for (let i = 0; i < urlArr.length; i++) {
    axios.get(urlArr[i]).then(response => {

      let $ = cheerio.load(response.data);

      // An empty array to save the data that we'll scrape
      let result = {};

      // Loop through all the titles in the page
      // Add the title and link if it is to a release that matches the filter.
      $("a.title").each(function (iter, element) {

        let title = $(element).text();
        let link = $(element).attr("href");

        if (filter.includes(title)) {
          result = {
            page: i + 1,
            title: title,
            link: link
          };
        }
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

matchLinks(artists);