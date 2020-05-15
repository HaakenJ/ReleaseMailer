// This is a script to parse a discogs wantlist that is in csv format.
// It should have functions to return an array of artists, albums, or releases.


const fs = require("fs");

// loop through all items in the csv
// add each item to an array
// when you reach a newline character,
//     add the previous array to a larger array
//     create a new array for the next line


let release = [],
    wantArr = [];

// for (let i = 0; i < wantList.length; i++) {
//     if (wantList[i] === "\n") {
//         wantArr.push(release);
//         release = [];
//     } else {

//     }
// }

function returnAllData(path) {

    fs.readFile(path, "utf-8", (err, allText) => {
        if (err) throw err;

        var allTextLines = allText.split(/\r\n|\n/);
        var headers = allTextLines[0].split(",");
        var lines = [];

        for (var i = 1; i < allTextLines.length; i++) {
            var data = allTextLines[i].split(",");


            var tarr = {};
            for (var j = 0; j < headers.length; j++) {
                tarr[headers[j]] = data[j];
            }
            lines.push(tarr);

        }
        return lines;
    });
};

function getArtists(path) {

    return new Promise((resolve, reject) => {
        fs.readFile(path, "utf-8", (err, allText) => {
            if (err) throw err;

            const allTextLines = allText.split(/\r\n|\n/);
            const headers = allTextLines[0].split(",");
            const lines = [];

            for (let i = 1; i < allTextLines.length; i++) {
                const data = allTextLines[i].split(",");


                const currentArtistObj = {};
                for (let j = 0; j < headers.length; j++) {
                    currentArtistObj[headers[j]] = data[j];
                }
                lines.push(currentArtistObj);

            }

            const artists = [];
            for (let i = 0; i < lines.length; i++) {
                artists.push(lines[i]["Artist"]);
            }
            resolve(artists);
        })
    })
};

function getkeywords(artists) {
    const skipWords = {
        "the": true,
        "and": true,
        "&": true,
        "one": true,
        "love": true,
        "new": true,
        "various": true,
        "with": true,
        "of": true,
        "joe": true,
        "players": true,
        "friends": true,
        "earth": true,
        "brother": true,
        "jack": true,
        "charlie": true,
        "order": true,
        "family": true,
        "swing": true,
        "slow": true,
        "/": true,
        "vs": true,
        "": true,
        "count": true,
        "big": true,
        "tom": true,
        "true": true,
        "alex": true,
        "white": true,
        "grey": true,
        "blue": true,
        "green": true,
        "yellow": true,
        "orange": true,
        "purple": true
    }
    const keywordsMap = {};
    for (const artist of artists) {
        if (artist === undefined) continue;
        const keywords = artist.split(" ");
        for (let keyWord of keywords) {
            keyWord = keyWord.replace(/["'.]/g, "");
            if (skipWords[keyWord.toLowerCase()]) continue;
            keywordsMap[keyWord] = true;
        }
    }
    return keywordsMap;
}

// returnAllData("./wantlist/wantlist.csv");
// getArtists("./wantlist/wantlist.csv")

// getArtists("./wantlist/wantlist.csv").then(artists => {
//     const keywords = getkeywords(artists);
// });

module.exports = {
    "getArtists": getArtists,
    "getkeywords": getkeywords
};