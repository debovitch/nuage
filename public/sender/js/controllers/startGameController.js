angular.module('nuage-sender').controller('startGameController',
    ['$rootScope', '$scope', '$state', '$stateParams', 'chromecast', 'MESSAGE',
        function($rootScope, $scope, $state, $stateParams, chromecast, MESSAGE) {

            $scope.send = function() {

                var message = {
                    service : MESSAGE.s2r.sendWords,
                    words : [$scope.word1, $scope.word2, $scope.word3]
                };
                chromecast.sendMessage(message);
            }
        }]);