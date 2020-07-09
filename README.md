# ReleaseTracker
A web-scraper for vinyl releases that takes a Discogs wantlist as an input and checks reddit.com/r/VinylReleases against the authors in your wantlist.  
The app then sends you emails on a specified basis updating you about any matches that have been found.


Need to:
Set up a .env file with:
    CLIENT_ID=Your Google OAuth2 Client ID
    CLIENT_SECRET= Your Client Secret
    REFRESH_TOKEN= Your refresh token
    EMAIL= The email you would like updates sent to
    SERVICE= The email client you will use, e.g. Gmail

Download your Discogs wantlist in csv format and save to the wantlist/ directory as a csv file named wantlist.csv

The script will query two urls for new releases:
    https://old.reddit.com/r/vinylreleases
    https://upcomingvinyl.com
If you would like to add or remove these then update the 'url' variable in mailer.js

If you would like to manually add keywords then do so in scrape.js in the matchLinks function.
At the top of the function set: keywords["yourKeyword"] = true; 
for every keyword you wish to add.  A few of my manual keywords have already been added.

The function getKeywords() in parser.js contains an object literal of words to skip, named skipWords.
This is necessary in order to skip certain words that are not helpful in finding a useful match.
Words such as 'the', 'blue', 'band' etc. are included here.  I have compiled this list manually
and you may find it necessary to add more words in the future.  When you receive an email with matches,
it will tell you which words were matched.  If you are receiving irrelevant matches using a certain keyword
too often, please add it to skipWords and make a pull request to the original repo so that we can 
continue to build a more accurate application.

TODO: 
* make a cli to set up the application for a new user
* Have option to update certain functions or variables using the cli i.e. adding to skipWords.
    - This is important to prevent users from having to mess with the implementation.