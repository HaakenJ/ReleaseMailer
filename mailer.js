require("dotenv").config();
const Parser = require("./parser");
const matchLinks = require("./scrape");
const nodemailer = require("nodemailer");
const path = require("path");

const {
    google
} = require("googleapis");
const OAuth2 = google.auth.OAuth2;

// Set up the OAuth2 client
const oauth2Client = new OAuth2(
    process.env.CLIENT_ID, // ClientID
    process.env.CLIENT_SECRET, // Client Secret
    "https://developers.google.com/oauthplayground" //Redirect URL
);

oauth2Client.setCredentials({
    refresh_token: process.env.REFRESH_TOKEN
});

const accessToken = oauth2Client.getAccessToken();

// Set up the  SMTP transport using OAuth credentials
const smtpTransport = nodemailer.createTransport({
    service: process.env.SERVICE,
    auth: {
        type: "OAuth2",
        user: process.env.EMAIL,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
        accessToken: accessToken
    }
});

// URL's to scrape for new releases
const urls = ["https://old.reddit.com/r/vinylreleases", "https://upcomingvinyl.com"];

// Use Parser to get a list of artists from the wantlist
Parser.getArtists(path.join(__dirname, "/wantlist/wantlist.csv"))
    .then(artists => {
        // Pass the artists into getKeywords to generate an array of keywords
        const keywords = Parser.getKeywords(artists);

        // Send emails for all matches found from the URL's
        for (const url of urls) {
            // Generate an array of matched links from the urls
            matchLinks(keywords, url)
                .then(matches => {

                    // If matches are found, send an email with the matched links
                    if (matches.length > 0) {
                        let resultString = "";
                        for (const match of matches) {
                            resultString += `Title: ${match.title} \n` +
                                            `Link: ${match.link} \n` +
                                            `Matched Keyword: ${match.matchedKeyword} \n` +
                                            `------------------------------------------------- \n`
                        }

                        const mailOptions = {
                            from: process.env.EMAIL,
                            to: process.env.EMAIL,
                            subject: "Upcoming and Current Vinyl Releases",
                            generateTextFromHTML: true,
                            text: resultString
                        };

                        smtpTransport.sendMail(mailOptions, (error, response) => {
                            error ? console.log(error) : console.log(response);
                            smtpTransport.close();
                        })
                    }
                })
        }
    })
