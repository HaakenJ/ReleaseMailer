const fs = require("fs");

/* 
    This script contains functions to parse the csv file and return specific
    data from the file.
*/


/*
    Returns all data from the csv file. Most likely not useful for searching
    a page directly as it would return too much.  Can be useful to get the 
    data then do something else with it.

    @param String - path to the csv file.
    @return array - an array of the lines of the csv file
*/
const returnAllData = (path) => {

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

/*
    Returns all artists from the csv file.

    @param String - path to the csv file.
    @return array - an array of the artists in the wantlist csv
*/
const getArtists = (path) => {

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


/*
    Function to get an object literal of keywords from a wantlist csv. 
    The keywords are created by spliting the specific words in the artists'
    names.  This is to account for different wordings and spelling of artists.

    @param array - an array of artists from the wantlist csv.
    @return object literal - an object literal of keywords
*/
const getKeywords = (artists) => {
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
        "little": true,
        "grey": true,
        "blue": true,
        "green": true,
        "yellow": true,
        "orange": true,
        "purple": true,
        "pink": true,
        "soul": true
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

module.exports = {
    getArtists: getArtists,
    getKeywords: getKeywords
};
