angular.module('nuage-receiver').controller('gameResultController',
    ['$rootScope', '$scope', '$state', '$stateParams', 'MESSAGE', 'gameManager',
        function($rootScope, $scope, $state, $stateParams, MESSAGE, gameManager) {

	        $scope.players = gameManager.getPlayers();

	        $scope.players.forEach(function(player) {

		        var otherPlayers = $scope.players.filter(function(otherPlayer) {
			        return player != otherPlayer;
		        });
		        player.words.forEach(function(word) {

			        otherPlayers.forEach(function(otherPlayer) {

				        otherPlayer.words.forEach(function(otherWord) {

					        if (otherWord.word == word.word) {
						        word.win = true;
					        }
				        });
			        });
		        });

		        player.score = player.words.reduce(function(memo, val) {
			        return memo + (val.win ? 1 : 0);
		        }, 0);
	        });

	        $scope.words1 = $scope.players.map(function(player) {
		        return player.words[0];
	        });
	        $scope.words2 = $scope.players.map(function(player) {
		        return player.words[1];
	        });
	        $scope.words3 = $scope.players.map(function(player) {
		        return player.words[2];
	        });
	        $scope.scores = $scope.players.map(function(player) {
		        return player.score;
	        });
        }]);