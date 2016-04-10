angular.module('nuage-sender').controller('gameAvailableController',
    ['$rootScope', '$scope', '$state', '$stateParams', 'chromecast', 'MESSAGE',
        function($rootScope, $scope, $state, $stateParams, chromecast, MESSAGE) {

    $scope.initiator = $stateParams.initiator;

    $scope.joinGame = function() {

        var message = {
            service : MESSAGE.s2r.joinGame,
            username : $scope.username
        };
        chromecast.sendMessage(message);
    };
}]);