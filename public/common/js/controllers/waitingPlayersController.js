angular.module('nuage-common').controller('waitingPlayersController',
    ['$rootScope', '$scope', '$stateParams', 'EVENT', 'MESSAGE',
        function($rootScope, $scope, $stateParams, EVENT, MESSAGE) {

            $scope.start = false;
            $scope.initiatorReady = false;

            $rootScope.$on(MESSAGE.r2s.gameJoined, function(event, data) {

                $scope.$apply(function() {

                    refresh(data.players, data.receiver);
                });
            });

            $rootScope.$on(MESSAGE.r2s.playerIsReady, function(event, data) {

                $scope.$apply(function() {

                    var playerReady = $scope.players.find(function(player) {
	                    return player.username == data.player;
                    });
	                if (playerReady) {
		                playerReady.ready = true;
	                } else {
		                $scope.initiatorReady = true;
	                }
                });
            });

            function refresh(players, receiver) {

                $scope.initiatorState = 'Partie créée par ' + players.find(function(player) {
                    return player.initiator;
                }).username;

                $scope.players = players.filter(function(player) {
                    return !player.initiator;
                });

                $scope.players = $scope.players.map(function(player) {
                    player.state = player.username + ' a rejoint la partie';
                    return player;
                });

                var missingPlayers = 3 - players.length;

                if (missingPlayers == 2) {
                    $scope.waitingMorePlayers = 'En attente de deux joueurs supplémentaires';
                } else if (missingPlayers == 1) {
                    $scope.waitingMorePlayers = 'En attente d\'un joueur supplémentaire';
                } else if (missingPlayers <= 0) {
                    $scope.waitingMorePlayers =  'Il y a suffisamment de joueurs pour démarrer';
                    if (!receiver) {
                        $scope.start = true;
                    }
                }
            }

            $scope.ready = function() {

                $rootScope.$broadcast(EVENT.readyToPlay);
            };

            $rootScope.$on(MESSAGE.r2s.readyToPlay, function(event, data) {

                $scope.$apply(function() {

                    refresh(data.players, data.receiver);
                });
            });

            refresh($stateParams.players);
        }]);