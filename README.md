# mbta-gtfs-reader-js
Downloads GTFS feeds. Spits out JSON blobs.

# Quick Start
Run 'nodemon loader.js'

# From reader.js
"reader.js" does the actual work of translating .txts into JSON blobs.

There are perfectly good libraries for reading GTFS files, but reading data out of files and moving it around correctly seems like a pretty big deal at the MBTA, so
I've ignored them and decided to party instead.

When called, this script creates an object out of a GTFS .txt file with keys that correspond to the first column of the data (almost always an id). 'Trips' is the exception.

Example:
const stopsData = parseGTFS("./extracted/", "stops.txt",);
console.log(stopsData['node-wtcst-wtctstairs-top']);
