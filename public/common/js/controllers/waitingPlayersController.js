angular.module('nuage-common').controller('waitingPlayersController',
    ['$rootScope', '$scope', '$stateParams', 'MESSAGE', function($rootScope, $scope, $stateParams, MESSAGE) {

    $rootScope.$on(MESSAGE.r2s.gameJoined, function(event, data) {

        $scope.$apply(function() {

            refresh(data.players);
        });
    });

    function refresh(players) {

        $scope.initiator = players.find(function(player) {
            return player.initiator;
        }).username;

        $scope.players = players.filter(function(player) {
            return !player.initiator;
        });

        var missingPlayers = 3 - players.length;

        if (missingPlayers == 2) {
            $scope.waitingMorePlayers = 'En attente de deux joueurs supplémentaires';
        } else if (missingPlayers == 1) {
            $scope.waitingMorePlayers = 'En attente d\'un joueur supplémentaire';
        } else if (missingPlayers == 0) {

        }
    }

    refresh($stateParams.players);
}]);