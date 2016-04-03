angular.module('hello').controller('createGameController', ['$scope', 'chromecast', function($scope, chromecast) {

    $scope.createGame = function() {

        console.log('Username', $scope.username);
        var message = {
            service : 'createGame',
            username : $scope.username
        };
        chromecast.sendMessage(JSON.stringify(message));
    }
}]);