var FileTransfer = require('org.apache.cordova.file-transfer.FileTransfer'),
    LocalFileSystem = require('org.apache.cordova.file.LocalFileSystem'),
    requestFileSystem = require('org.apache.cordova.file.requestFileSystem'),
    exec = require('cordova/exec');

var AppInstaller = function () {
    this.options = {};
};

AppInstaller.prototype = {
    downloadAndInstall: function (url, success, error) {
        var filePath = 'Download/appToInstall.apk';
        var onRequestFileSystemSuccess = function (fileSystem) {
            var getFileSuccess = function (fileEntry) {
                var fileTransfer = new FileTransfer();
                var uri = encodeURI(url);
                fileTransfer.download(uri, fileEntry.toURL(),
                    function (entry) {
    	            	exec(success, error, 'AppInstaller', 'install', [entry.fullPath]);
                    },
                    error
                );
            };

            fileSystem.root.getFile(filePath, {
                create: true,
                exclusive: false
            }, getFileSuccess, error);
        };
        requestFileSystem(LocalFileSystem.PERSISTENT, 0, onRequestFileSystemSuccess, error);
    }
};

module.exports = new AppInstaller();
