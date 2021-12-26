//TODO: Make this asynchronous. I'm fine with hanging everything for now. 
//TODO: Wrap this whole thing in a promise returner?
//TODO: See if we can do away with promises in favor of async/await. Nicholai was right about promise trees being annoying.


//Fetch GTFS Feed
const download = require("./downloader");
//Clear directory at 'outpath', unzip GTFS
const unzipMod = require("./unzip.js");
const unzip = unzipMod.unzip;
//Read and expose GTFS data to the application
const parseGTFS = require("./reader.js");
//Node filesystem
const fs = require('fs');
    
const url = 'https://cdn.mbta.com/MBTA_GTFS.zip';
const path = 'MBTA_GTFS.zip';
const outpath = './extracted';

let calendarData = '';
let datesData = '';
let routesData = '';
let patternData = '';
let tripsData = '';
let stoptimeData = '';
let stopsData = '';

const loadData = function (path) {
let loadpath = path +'/';

console.log("Loading all data. Wait a minute.");
calendarData = parseGTFS(loadpath, "calendar.txt",);
datesData = parseGTFS(loadpath, "calendar_dates.txt",);
routesData = parseGTFS(loadpath, "routes.txt",);
patternData = parseGTFS(loadpath, "route_patterns.txt",);
tripsData = parseGTFS(loadpath, "trips.txt",);//Trips might require special consideration. Why on earth isn't trip_ID the first column?
stoptimeData = parseGTFS(loadpath, "stop_times.txt",);
stopsData = parseGTFS(loadpath, "stops.txt");

//Test lines to Make sure you can access data by the properties you want. Trips might be annoying here.
//console.log(calendarData['BUS122-hbb12017-Su-02']);
//console.log(datesData['WinterWeekday']);
// console.log(routesData['Orange']);
// console.log(patternData['Red-1-0']);
//console.log(tripsData['10']);
//console.log(stoptimeData['49246309-2BKHGLBNoGLX']);
//console.log(stopsData['node-wtcst-wtctstairs-top']);

console.log("Data is now loaded");
}

function getData (){
    return new Promise ((resolve, reject)=>{
      

        download(url, path)//The function wrapping around unzip needs to return unzip() for it to be part of the promise chain.
        .then(function(){return unzip(outpath)})//Not sure why I need this wrapper function here, but just putting unzip() in then() seems to invoke immediately. Read up on closures and 'this'
        .then(function(){
            
        console.log("This is when getData is resolving the promise");
            if (fs.existsSync(outpath)){
                console.log('Found '+ outpath);
                resolve();
            }
            else{
                reject();
            }   

            });

    })

}

getData().then(function(){loadData(outpath)});



