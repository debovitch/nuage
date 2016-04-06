angular.module('debug', [])

    .factory('debug', ['$rootScope', function($rootScope) {

        return {
            log : function(message) {

                console.log(message);
                $rootScope.$broadcast('debug', message);
            }
        };
    }]);