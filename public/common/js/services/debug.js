angular.module('debug', [])

    .factory('debug', ['$rootScope', function($rootScope) {

        return {
            /**
             * Append message to debug message window
             * @param {string} message A message string
             */
            log : function(message) {

                console.log(message);
                $rootScope.$broadcast('debug', message);
            }
        };
    }]);