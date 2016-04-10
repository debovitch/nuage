angular.module('nuage-sender').controller('gameAvailableController', ['$scope', '$stateParams', function($scope, $stateParams) {

    $scope.initiator = $stateParams.initiator;

    $scope.joinGame = function() {

        var message = {
            service : MESSAGE.s2r.joinGame,
            username : $scope.username
        };
        chromecast.sendMessage(message);
    };
}]);