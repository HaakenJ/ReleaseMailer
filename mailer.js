require("dotenv").config();
const Parser = require("./parser");
const matchLinks = require("./scrape");
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

// Set up the OAuth2 client
const oauth2Client = new OAuth2 (
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
    service: "Gmail",
    auth: {
        type: "OAuth2",
        user: "kramerhjohnson@gmail.com",
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
        accessToken: accessToken
    }
});

const mailOptions = {
    from: "kramerhjohnson@gmail.com",
    to: "kramerhjohnson@gmail.com",
    subject: "Node.js Email with Secure OAuth",
    generateTextFromHTML: true,
    html: "<h1>Yo did this work!?</h1>"
};

smtpTransport.sendMail(mailOptions, (error, response) => {
    error ? console.log(error) : console.log(response);
    smtpTransport.close();
})

// Parser.getArtists("./wantlist/wantlist.csv")
//     .then(artists => {
//         const keywords = Parser.getKeywords(artists);

//         const url = "https://old.reddit.com/r/vinylreleases";
//         const url2 = "https://upcomingvinyl.com";

//         matchLinks(keywords, url)
//         .then(matches => {
//             if (matches.length > 0) {
//                 const mailOptions = {
//                     from: "haaken1234@gmail.com",
//                     to: "kramerhjohnson@gmail.com",
//                     subject: "Current Vinyl Releases",
//                     text: matches
//                 }

//                 transport.sendMail(mailOptions, (err, info) => {
//                     if (err) console.error(err);

//                     console.log(`Message sent ${info.messageId}`);
//                 })
//             }
//         })
//     })