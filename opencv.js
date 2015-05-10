var path = require('path');
var os   = require('os');

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

function mangleName(name, version, debug) {
    var prefix = (isUnix() || isDarwin()) ? 'lib' : '';
    var suffix = (isWindows() ? version : '');   
    var ext    = (isWindows() ? '.lib' : '.a');
    if (debug)
        suffix += 'd';

    return prefix + name + suffix + ext;
}

function mangleRuntimeLib(name, version, debug) {
    var prefix = (isUnix() || isDarwin()) ? 'lib' : '';
    var suffix = (version && (isUnix() || isDarwin())) ? version : '';   
    var ext    = (isWindows() ? '.dll' : '.so');
    if (debug)
        suffix += 'd';

    return prefix + name + suffix + ext;
}

module.exports = {
    version: '300',

    dll_files: function(toolset, debug) {
        if (isWindows()) {
            var arch = is64bit() ? 'x64' : 'x86';
            var opencv_dll_dir = path.resolve(__dirname, 'opencv', arch, toolset, 'bin');
            var libs = [
                opencv_dll_dir + '/' + mangleRuntimeLib('opencv_ffmpeg300_64')
            ]
            console.log(libs.join(' '));
        }
    },

    libraries: function(debug) {
        
        var ocv_libraries = [];
        var trd_libraries = [];

        if (isWindows()) {
            var opencv_lib_dir = path.resolve(__dirname, 'opencv', 'lib');

            ocv_libraries.push(opencv_lib_dir + '/' + mangleName('opencv_calib3d',     this.version, debug));
            ocv_libraries.push(opencv_lib_dir + '/' + mangleName('opencv_core',        this.version, debug));
            ocv_libraries.push(opencv_lib_dir + '/' + mangleName('opencv_features2d',  this.version, debug));
            ocv_libraries.push(opencv_lib_dir + '/' + mangleName('opencv_flann',       this.version, debug));
            ocv_libraries.push(opencv_lib_dir + '/' + mangleName('opencv_highgui',     this.version, debug));
            ocv_libraries.push(opencv_lib_dir + '/' + mangleName('opencv_imgcodecs',   this.version, debug));
            ocv_libraries.push(opencv_lib_dir + '/' + mangleName('opencv_imgproc',     this.version, debug));
            ocv_libraries.push(opencv_lib_dir + '/' + mangleName('opencv_ml',          this.version, debug));
            ocv_libraries.push(opencv_lib_dir + '/' + mangleName('opencv_objdetect',   this.version, debug));
            ocv_libraries.push(opencv_lib_dir + '/' + mangleName('opencv_photo',       this.version, debug));
            ocv_libraries.push(opencv_lib_dir + '/' + mangleName('opencv_shape',       this.version, debug));
            ocv_libraries.push(opencv_lib_dir + '/' + mangleName('opencv_stitching',   this.version, debug));
            ocv_libraries.push(opencv_lib_dir + '/' + mangleName('opencv_superres',    this.version, debug));
            ocv_libraries.push(opencv_lib_dir + '/' + mangleName('opencv_ts',          this.version, debug));
            ocv_libraries.push(opencv_lib_dir + '/' + mangleName('opencv_video',       this.version, debug));
            ocv_libraries.push(opencv_lib_dir + '/' + mangleName('opencv_videoio',     this.version, debug));
            ocv_libraries.push(opencv_lib_dir + '/' + mangleName('opencv_videostab',   this.version, debug));

            ocv_libraries.push(opencv_lib_dir + '/' + mangleName('IlmImf',    '', debug));
            ocv_libraries.push(opencv_lib_dir + '/' + mangleName('libjasper', '', debug));
            ocv_libraries.push(opencv_lib_dir + '/' + mangleName('libjpeg',   '', debug));
            ocv_libraries.push(opencv_lib_dir + '/' + mangleName('libpng',    '', debug));
            ocv_libraries.push(opencv_lib_dir + '/' + mangleName('libtiff',   '', debug));
            ocv_libraries.push(opencv_lib_dir + '/' + mangleName('libwebp',   '', debug));
            ocv_libraries.push(opencv_lib_dir + '/' + mangleName('zlib',      '', debug));
            ocv_libraries.push(opencv_lib_dir + '/' + mangleName('ippicvmt',  '', false));


            console.log(ocv_libraries.join(';'));
        }
        
        if (isUnix()) {
            var opencv_lib_dir = path.resolve(__dirname, 'opencv', 'lib');
            var opencv_3rd_dir = path.resolve(__dirname, 'opencv', 'share', 'OpenCV', '3rdparty', 'lib');

            ocv_libraries.push(opencv_lib_dir + '/' + mangleName('opencv_calib3d',       this.version));
            ocv_libraries.push(opencv_lib_dir + '/' + mangleName('opencv_core',          this.version));
            ocv_libraries.push(opencv_lib_dir + '/' + mangleName('opencv_features2d',    this.version));
            ocv_libraries.push(opencv_lib_dir + '/' + mangleName('opencv_flann',         this.version));
            ocv_libraries.push(opencv_lib_dir + '/' + mangleName('opencv_hal',           this.version));
            ocv_libraries.push(opencv_lib_dir + '/' + mangleName('opencv_highgui',       this.version));
            ocv_libraries.push(opencv_lib_dir + '/' + mangleName('opencv_imgcodecs',     this.version));
            ocv_libraries.push(opencv_lib_dir + '/' + mangleName('opencv_imgproc',       this.version));
            ocv_libraries.push(opencv_lib_dir + '/' + mangleName('opencv_ml',            this.version));
            ocv_libraries.push(opencv_lib_dir + '/' + mangleName('opencv_objdetect',     this.version));
            ocv_libraries.push(opencv_lib_dir + '/' + mangleName('opencv_photo',         this.version));
            ocv_libraries.push(opencv_lib_dir + '/' + mangleName('opencv_shape',         this.version));
            ocv_libraries.push(opencv_lib_dir + '/' + mangleName('opencv_stitching',     this.version));
            ocv_libraries.push(opencv_lib_dir + '/' + mangleName('opencv_superres',      this.version));
            ocv_libraries.push(opencv_lib_dir + '/' + mangleName('opencv_ts',            this.version));
            ocv_libraries.push(opencv_lib_dir + '/' + mangleName('opencv_video',         this.version));
            ocv_libraries.push(opencv_lib_dir + '/' + mangleName('opencv_videoio',       this.version));
            ocv_libraries.push(opencv_lib_dir + '/' + mangleName('opencv_videostab',     this.version));

            trd_libraries.push(opencv_3rd_dir + '/' + mangleName('ippicv'));
            trd_libraries.push(opencv_3rd_dir + '/' + mangleName('libwebp'));

            console.log(ocv_libraries.join(' ') + ' ' + trd_libraries.join( ' '));
        }
        
        if (isDarwin()) {
            var opencv_lib_dir = path.resolve(__dirname, 'opencv', 'lib');
            var opencv_3rd_dir = path.resolve(__dirname, 'opencv', 'share', 'OpenCV', '3rdparty', 'lib');

            ocv_libraries.push(opencv_lib_dir + '/' + mangleName('opencv_calib3d',       this.version));
            ocv_libraries.push(opencv_lib_dir + '/' + mangleName('opencv_core',          this.version));
            ocv_libraries.push(opencv_lib_dir + '/' + mangleName('opencv_features2d',    this.version));
            ocv_libraries.push(opencv_lib_dir + '/' + mangleName('opencv_flann',         this.version));
            ocv_libraries.push(opencv_lib_dir + '/' + mangleName('opencv_highgui',       this.version));
            ocv_libraries.push(opencv_lib_dir + '/' + mangleName('opencv_imgcodecs',     this.version));
            ocv_libraries.push(opencv_lib_dir + '/' + mangleName('opencv_imgproc',       this.version));
            ocv_libraries.push(opencv_lib_dir + '/' + mangleName('opencv_ml',            this.version));
            ocv_libraries.push(opencv_lib_dir + '/' + mangleName('opencv_objdetect',     this.version));
            ocv_libraries.push(opencv_lib_dir + '/' + mangleName('opencv_optim',         this.version));
            ocv_libraries.push(opencv_lib_dir + '/' + mangleName('opencv_photo',         this.version));
            ocv_libraries.push(opencv_lib_dir + '/' + mangleName('opencv_shape',         this.version));
            ocv_libraries.push(opencv_lib_dir + '/' + mangleName('opencv_stitching',     this.version));
            ocv_libraries.push(opencv_lib_dir + '/' + mangleName('opencv_superres',      this.version));
            ocv_libraries.push(opencv_lib_dir + '/' + mangleName('opencv_ts',            this.version));
            ocv_libraries.push(opencv_lib_dir + '/' + mangleName('opencv_video',         this.version));
            ocv_libraries.push(opencv_lib_dir + '/' + mangleName('opencv_videoio',       this.version));
            ocv_libraries.push(opencv_lib_dir + '/' + mangleName('opencv_videostab',     this.version));

            trd_libraries.push(opencv_3rd_dir + '/' + mangleName('jpeg'));
            trd_libraries.push(opencv_3rd_dir + '/' + mangleName('png'));
            trd_libraries.push(opencv_3rd_dir + '/' + mangleName('zlib'));
            trd_libraries.push(opencv_3rd_dir + '/' + mangleName('tiff'));
            trd_libraries.push(opencv_3rd_dir + '/' + mangleName('ippicv'));

            console.log(ocv_libraries.join(' ') + ' ' + trd_libraries.join( ' '));
        }
    },

    include_dirs: function() {
        console.log(path.resolve(__dirname, 'opencv', 'include'));
    }
};
