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