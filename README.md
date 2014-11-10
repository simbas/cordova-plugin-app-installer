App Installer
===


### Install

```
cordova plugin add https://github.com/simbas/cordova-plugin-app-installer
```


### How to use

```javascript
window.cordova.AppInstaller.downloadAndInstall("http://mydomain.com/myapp.apk", function(){
	console.log('install ok');
}, function(err){
	console.log(err);
}, function(progressEvent){
	if (progressEvent.lengthComputable) {
		progress = progressEvent.loaded / progressEvent.total;
		console.log(progress);
	}
});
```

### Angular example

```javascript
angular.module('myModule')
    .service('appInstaller', function AppInstaller($window, $log, $q) {
        this.install = function (url) {
            if (!$window.cordova || !$window.cordova.AppInstaller) {
                $log.error('Cordova app installer plugin not found.');
                return ;
            }
            var deferred = $q.defer();
            $window.cordova.AppInstaller.downloadAndInstall(url, deferred.resolve, deferred.reject);
            return deferred.promise;
        };
    });
```
