// Using this template, the cheerio documentation,
// and what you've learned in class so far, scrape a website
// of your choice, save information from the page in a result array, and log it to the console.

const cheerio = require("cheerio");
const axios = require("axios");

async function getTitleLink() {
  const urlArr = [
    "https://old.reddit.com/r/vinylreleases",
    "https://old.reddit.com/r/VinylReleases/?count=25&after=t3_ehlmpi",
    "https://old.reddit.com/r/VinylReleases/?count=50&after=t3_eemh1e"
  ];

  let links = [];

  for (let i = 0; i < urlArr.length; i++) {
    await axios.get(urlArr[i]).then(function (response) {

      let $ = cheerio.load(response.data);

      // An empty array to save the data that we'll scrape
      let result = {};

      // Loop through all the titles in the page
      // Add the title and link if it is to a light in the attic release
      $("a.title").each(function (iter, element) {

        let title = $(element).text();
        let link = $(element).attr("href");

        if (link.includes("lightintheattic")) {
          result = {
            page: i + 1,
            title: title,
            link: link
          };
        }
      });

      // // Log the results
      // console.log(`-----------Page ${i + 1}-----------`);
      // console.log(results);
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

getTitleLink();