angular.module('debug', ['constants'])

    .factory('debug', ['$rootScope', 'EVENT', function($rootScope, EVENT) {

        return {
            log : function(event, message) {

                console.log(message);
                $rootScope.$broadcast(event, message);
            },
            chromecast : function(message) {

                console.log(message);
                $rootScope.$broadcast(EVENT.chromecast, message);
            },
            sender : function(message) {

                console.log(message);
                $rootScope.$broadcast(EVENT.sender, message);
            },
            receiver : function(message) {

                console.log(message);
                $rootScope.$broadcast(EVENT.receiver, message);
            }
        };
    }]);