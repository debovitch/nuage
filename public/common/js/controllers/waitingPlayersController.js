angular.module('nuage-common').controller('waitingPlayersController', ['$scope', '$stateParams', function($scope, $stateParams) {

    $scope.initiator = $stateParams.initiator;
    $scope.player = null;
    $scope.waitingMorePlayers = 'En attente de deux joueurs supplémentaires';

    //$rootScope.$on(MESSAGE.r2s.gameAvailable, function(event, data) {
    //
    //    $scope.$apply(function() {
    //
    //        $scope.player = ;
    //    }
    //});
}]);