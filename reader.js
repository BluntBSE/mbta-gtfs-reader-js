// There are perfectly good libraries for reading GTFS files, but reading data out of files and moving it around correctly seems like a pretty big deal at the MBTA, so
// I've ignored them and decided to party instead
//When called, this script creates an object out of a GTFS .txt file with keys that correspond to the first column of the data (almost always an id)
//Example:
//const stopsData = parseGTFS("./extracted/", "stops.txt",);
//console.log(stopsData['node-wtcst-wtctstairs-top']);

const fs = require('fs');
const directory = "./"

const parseGTFS = (directory, filename,) => {
const filePath = directory + filename;
const fileData = fs.readFileSync(filePath,'utf8');

const parseData=(data)=>{
    let output = {};
    let keysvalues = data.split('\n');
    //First row of GTFS .txt files is always header. Save that as an array in 'keys'.
    let keys = keysvalues[0].split(',');
    //Make the first item in each values sub-array a property on our output object.
    //'1' here skips the header, so we're accessing data only.
    //This loop adds a key to the output that is tied to the first item in each row of GTFS data, which seems to always be an ID of some kind.
    for(let i = 1; i<keysvalues.length; i++){
       let id = keysvalues[i].split(',')[0];
     
       Object.defineProperty(output, id, {
        enumerable: true,
        configurable: true,
        writable: true,
        value: {},

       });
       let values = keysvalues[i].split(',');
       //For each row in the GTFS data, tie the data to the objects we just created using the "keys" we extracted and the data in "values"
       //Relies on values being the same length as keys. Which should always be true for valid GTFS data.
            for (let j = 0; j<values.length; j++){
                Object.defineProperty(output[id],keys[j],{
                    enumerable: true,
                    configurable: true,
                    writable: true,
                    value: values[j],

                })

            }

    }

    return output;

};

return(parseData(fileData));




};


module.exports = parseGTFS;
