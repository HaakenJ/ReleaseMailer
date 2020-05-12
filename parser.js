// This is a script to parse a discogs wantlist that is in csv format.
// It should have functions to return an array of artists, albums, or releases.


const fs = require('fs');

// loop through all items in the csv
// add each item to an array
// when you reach a newline character,
//     add the previous array to a larger array
//     create a new array for the next line


let release = [],
    wantArr = [];

// for (let i = 0; i < wantList.length; i++) {
//     if (wantList[i] === '\n') {
//         wantArr.push(release);
//         release = [];
//     } else {

//     }
// }

function returnAllData(path) {

    fs.readFile(path, 'utf-8', (err, allText) => {
        if (err) throw err;

        var allTextLines = allText.split(/\r\n|\n/);
        var headers = allTextLines[0].split(',');
        var lines = [];

        for (var i = 1; i < allTextLines.length; i++) {
            var data = allTextLines[i].split(',');


            var tarr = {};
            for (var j = 0; j < headers.length; j++) {
                tarr[headers[j]] = data[j];
            }
            lines.push(tarr);

        }
        console.log(lines);
        return lines;
    });
};

function getArtists(path) {

    fs.readFile(path, 'utf-8', (err, allText) => {
        if (err) throw err;

        var allTextLines = allText.split(/\r\n|\n/);
        var headers = allTextLines[0].split(',');
        var lines = [];

        for (var i = 1; i < allTextLines.length; i++) {
            var data = allTextLines[i].split(',');


            var tarr = {};
            for (var j = 0; j < headers.length; j++) {
                tarr[headers[j]] = data[j];
            }
            lines.push(tarr);

        }

        let artists = [];
        for (let i = 0; i < lines.length; i++) {
            artists.push(lines[i]['Artist']);
        }
        console.log(artists);
        return artists;
    });
};

// returnAllData('./wantlist/wantlist.csv');
// getArtists('./wantlist/wantlist.csv')

const artists = getArtists('./wantlist/wantlist.csv');

module.exports = artists;