require("dotenv").config();
const Parser = require("./parser");
const matchLinks = require("./scrape");
const nodemailer = require("nodemailer");
const smtpTransport = require("nodemailer-smtp-transport");
const xoauth2 = require("xoauth2");

const transport = nodemailer.createTransport(smtpTransport({
    service: "Gmail",
    auth: {
        user: "haaken1234@gmail.com",
        pass: process.env.GMAIL
        // xoauth2: xoauth2.createXOAuth2Generator({
        //          user: "haaken1234@gmail.com",
        //          pass: process.env.GMAIL
        //         })
        //     }
    // })
        }
    })
);

Parser.getArtists("./wantlist/wantlist.csv")
    .then(artists => {
        const keywords = Parser.getKeywords(artists);

        const url = "https://old.reddit.com/r/vinylreleases";
        const url2 = "https://upcomingvinyl.com";

        matchLinks(keywords, url)
        .then(matches => {
            if (matches.length > 0) {
                const mailOptions = {
                    from: "haaken1234@gmail.com",
                    to: "kramerhjohnson@gmail.com",
                    subject: "Current Vinyl Releases",
                    text: matches
                }

                transport.sendMail(mailOptions, (err, info) => {
                    if (err) console.error(err);

                    console.log(`Message sent ${info.messageId}`);
                })
            }
        })
    })