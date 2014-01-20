var FileTransfer = require('org.apache.cordova.file-transfer.FileTransfer'),
    LocalFileSystem = require('org.apache.cordova.file.LocalFileSystem'),
    requestFileSystem = require('org.apache.cordova.file.requestFileSystem'),
    exec = require('cordova/exec');

var AppInstaller = function() {
        this.options = {};
};

AppInstaller.prototype = {
    downloadAndInstall: function (url, success, error) {
        var filePath = 'download/appToInstall.apk';
        requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fileSystem) {
            fileSystem.root.getFile(filePath, {
                create: true,
                exclusive: false
            }, function (fileEntry) {
                var fileTransfer = new FileTransfer();
                var uri = encodeURI(url);
                fileTransfer.download(
                    uri,
                    fileEntry.fullPath,
                    function (entry) {
                        exec(success, error, 'AppInstaller', 'install', [entry.fullPath]);
                    },
                    error
                );
            });
        });
    }
};

module.exports = new AppInstaller();
