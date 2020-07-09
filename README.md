# ReleaseTracker
A web-scraper for vinyl releases that takes a Discogs wantlist as an input and checks reddit.com/r/VinylReleases against the authors in your wantlist.  
The app then sends you emails on a specified basis updating you about any matches that have been found.


Need to:
Set up a .env file with:
    CLIENT_ID=Your Google OAuth2 Client ID
    CLIENT_SECRET= Your Client Secret
    REFRESH_TOKEN= Your refresh token
    EMAIL= The email you would like updates sent to

Download your Discogs wantlist in csv format and save to the wantlist/ directory as a csv file named wantlist.csv