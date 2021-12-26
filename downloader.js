//Node HTTPs + Filesystem libraries
const http = require('https');
const fs = require('fs');

//Download function
 const download = function (url, destination) {
	return new Promise ((resolve, reject) => {
	var file = fs.createWriteStream(destination);
	var request = http.get(url, function (response) {
		response.pipe(file);
		file.on('finish', function () {
			
			file.close(function () {
                console.log("File downloaded");
				resolve();
			}); 
		});
		
	}).on('error', function (err) { 
        console.log('Found error while downloading');
		fs.unlink(destination);
		reject();

	});
	
	

})

};


module.exports = download;

//Connect to MBTA (connect.js)
//Unzip file
//Expose file contents