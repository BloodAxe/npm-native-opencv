var Download = require('download');
var progress = require('download-status');
var fs       = require('fs');
var os       = require('os');
var path     = require('path');
var opencv   = require('./opencv.js');

function isDarwin() {
    return os.platform() == 'darwin';
}

function isWindows() {
    return os.platform() == 'win32';
}

function isUnix() {
    return os.platform() == 'linux';
}

function is64bit() {
    return os.arch() == 'x64';
}

var cdn = 'http://static.computer-vision-talks.com/dist/opencv/';

var opencvArchive = '';

if (isWindows()) {
    if (is64bit()) {
        opencvArchive = cdn + 'opencv-3.0.0-vc12-x64.zip';
    }
    else {
        opencvArchive = cdn + 'opencv-3.0.0-vc12-x86.zip';        
    }
}
else if (isDarwin()) {
    opencvArchive = cdn + 'opencv-3.0.0b-darwin.zip';
}
else if (isUnix()) {
    opencvArchive = cdn + 'opencv-3.0.0b-unix.zip';
} 
else {
    throw 'Your platform ' + os.platform() + '/' + os.type() + ' is not supported. Sorry.';
}

var opencvPath = path.resolve(__dirname, 'opencv');
console.log('OpenCV will be downloaded to ', opencvPath);

function runInOpenCVDoesNotExists(cb) {
    fs.mkdir(opencvPath, 0777, function(err) {
        if (err)
            console.log("OpenCV directory already exists. Skipping download.");
        else 
            cb(); // successfully created folder
    });    
}

runInOpenCVDoesNotExists(function() {
    console.log('Loading OpenCV from ', opencvArchive);

    var download = new Download({ extract: true, strip: (isUnix() || isDarwin()) })
        .get(opencvArchive)
        .dest(path.resolve(__dirname, 'opencv'))
        .use(progress());

    download.run(function (err, files, stream) {
        if (err) {
            console.log('Caught error during unzip:', err);
            throw err;
        }

        console.log('File downloaded successfully!');
    });
});
