(function(){
    "use strict";

    angular
        .module('common.services', ['ngResource']);
        .constant('appSettings', {
            serverPath: 'http://api.herptracker.com/'
        });
}());
