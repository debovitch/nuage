angular.module('nuage-receiver').controller('startGameController',
    ['$rootScope', '$scope', '$state', '$stateParams', '$http', 'MESSAGE',
        function($rootScope, $scope, $state, $stateParams, $http, MESSAGE) {

            $http.get('/words')
                .success(function(response) {

                    console.log(response);
                    $scope.word = response;

                }).error(function(response) {

                });
        }]);