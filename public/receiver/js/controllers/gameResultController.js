angular.module('nuage-receiver').controller('gameResultController',
    ['$rootScope', '$scope', '$state', '$stateParams', 'MESSAGE', 'gameManager',
        function($rootScope, $scope, $state, $stateParams, MESSAGE, gameManager) {

	        $scope.players = gameManager.getPlayers();

	        $scope.words1 = $scope.players.map(function(player) {
		        return player.words[0];
	        });
	        $scope.words2 = $scope.players.map(function(player) {
		        return player.words[1];
	        });
	        $scope.words3 = $scope.players.map(function(player) {
		        return player.words[2];
	        });
        }]);