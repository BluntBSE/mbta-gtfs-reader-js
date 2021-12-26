const fs = require('fs');
const StreamZip = require('node-stream-zip');
const unzipPath = './extracted';
async function unzip(outpath){
const zip = new StreamZip.async({ file: 'MBTA_GTFS.zip' });
//'Path' is the folder to which you are extracting.
const path = outpath;
//If path already exists, delete it. In a real world applicaton, we'd probably want to archive a certain number of extracted files.
//TODO: Do this asynchronously to avoid hanging the application if you want users to be able to update this. Works for now.
//TODO: You could probably see if there's any change between GTFS files before downloading them & deleting again.
const deleteFolderRecursive = (path) => {


  if( fs.existsSync(path) ) {
    console.log("Found " + path + " , deleting");
      fs.readdirSync(path).forEach(function(file) {
        var curPath = path + "/" + file;
          if(fs.lstatSync(curPath).isDirectory()) { // recurse
              deleteFolderRecursive(curPath);
          } else { // delete file
              fs.unlinkSync(curPath);
          }
      });
      fs.rmdirSync(path);
    }
};

deleteFolderRecursive(path);

//Make directory, extract
fs.mkdirSync('extracted');
const count = await zip.extract(null, './extracted');
console.log(`Extracted ${count} entries`);
await zip.close()

//console.log("This is when unzip is resolving its promise");
return new Promise(function (resolve, reject){

  resolve(console.log("resolved unzip successfully"));
 // reject(console.log("resolved unzip unsuccessfully"));

  
});

}

module.exports = {
  unzip,
  unzipPath,
};
// const output = fs.createWriteStream('./test.json');
