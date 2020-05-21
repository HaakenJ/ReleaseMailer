require("dotenv").config();
const Parser = require("parser");
const Scraper = require("scrape");
const nodemailer = require("nodemailer");

smtpTransport = nodemailer.createTransport("SMTP", {
    service: "Gmail",
    auth: {
        user: "haaken1234@gmail.com",
        pass: process.env.GMAIL
    }
})

