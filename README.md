# Release Mailer

Release Mailer is a web-scraping application that uses your Discogs wantlist to regularly check for new vinyl releases online and notifies you via email when matching new releases are found.

## Getting Started

To get started you will optimally have a RasperryPi or some other computer that will be regularly running.  This way the computer 
can check for new releases at regular intervals and send you emails of any matches that are found.

If you do not have a dedicated computer to use, you can simply choose when to run the application manually rather than having to
search through the websites of your choice.

### Prerequisites

You will also need some email account to use and Google OAuth2 credentials (i.e. a client ID, a client secret, and a refresh token).

Setup for the Google OAuth2 credentials can be found here https://developers.google.com/identity/protocols/oauth2

### Installing

Clone the repository to the folder you wish it to be in.

* To install all dependencies start with

```
npm install
```

* Next, download your Discogs wantlist in csv file format and save it in the wantlist/ directory in a file named wantlist.csv

* Then, create a file in the root directory named .env
In this file add the following text with your credentials and email info and NO SPACES OR QUOTES:
```
    CLIENT_ID= Your Google OAuth2 Client ID
    CLIENT_SECRET= Your Client Secret
    REFRESH_TOKEN= Your refresh token
    FROMEMAIL= The email you would like updates sent from
    TOEMAIL= The email you would like updates sent to
    SERVICE= The email client you will use, e.g. Gmail
```
For a list of services and their exact names, check https://nodemailer.com/smtp/well-known/

* The application will query two urls for new releases:
    https://old.reddit.com/r/vinylreleases
    https://upcomingvinyl.com
If you would like to add or remove these then update the 'url' variable in mailer.js

* If you would like to manually add keywords then do so in scrape.js in the matchLinks function.
    - At the top of the function set: 
    ```
    keywords["yourKeyword"] = true;
    ```
    for every keyword you wish to add.
    A few of my own manual keywords have been added, you may wish to remove these.

* The function getKeywords() in parser.js contains an object literal of words to skip, named skipWords.
This is necessary in order to skip certain words that are not helpful in finding a useful match.
Words such as 'the', 'blue', 'band' etc. are included here.  I have compiled this list manually
and you may find it necessary to add more words in the future.  When you receive an email with matches,
it will tell you which words were matched.  If you are receiving irrelevant matches using a certain keyword
too often, please add it to skipWords and make a pull request to the original repo so that we can 
continue to build a more accurate application.

## Deployment

At this point you should be all set up.

Simply run:
```
node mailer.js
```
from the root directory and an email will be sent from your fromEmail to your toEmail containing any matches 
that were found.

* If you have a RaspberryPi or other Linux based machine that will be running regularly, then I would recommend
setting up a cronjob to run this application at regular intervals.  This way you are unlikely to miss any big 
releases!

* To set up a cronjob, open your terminal and enter:
```
nano crontab -e
```
* Determine the proper cron syntax you need to run the application at your desired interval
    - this site may be helpful https://crontab-generator.org/
* Then, in your open crontab enter your cron syntax then 'node' followed by the path from your root to mailer.js
For example, to run mailer.js every four hours:
```
0 */4 * * * node ~/git_repos/ReleaseMailer/mailer.js
```

## Built With

* [Node.js](https://nodejs.org/en/) - JavaScript Runtime
* [Axios](https://www.npmjs.com/package/axios) - HTTP Client for Node
* [Cheerio](https://cheerio.js.org/) - HTML Parser
* [NodeMailer](https://nodemailer.com/about/) - Module for sending emails via Node
* [xoauth2](https://www.npmjs.com/package/xoauth2) - Generates XOAuth2 tokens


## Contributing

Go ahead and submit a pull request and I'll check it out!  I appreciate any help! 

## Authors

* **Kramer Johnson** - *Initial work* - [HaakenJ](https://github.com/HaakenJ)

See also the list of [contributors](https://github.com/ReleaseMailer/contributors) who participated in this project.
