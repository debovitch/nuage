angular.module('nuage').controller('waitingPlayersController', ['$scope', '$stateParams', function($scope, $stateParams) {

    $scope.initiator = $stateParams.initiator;
    $scope.player = null;
    $scope.waitingMorePlayers = 'En attente de deux joueurs supplémentaires';
}]);