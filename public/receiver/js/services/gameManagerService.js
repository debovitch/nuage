angular.module('nuage-receiver').service('gameManager', [function() {

    this.senders = [];

    this.getInitiator = function() {

        return this.senders.find(function(sender) {
            return sender.initiator;
        });
    };

    this.getSenderById = function(senderId) {

        return this.senders.find(function(sender) {
            return sender.id == senderId;
        });
    };

    this.getPlayers = function() {

        return this.senders.filter(function(sender) {
            return typeof(sender.username) != 'undefined';
        });
    };

    this.isEverybodyReadyToPlay = function() {

        var players = this.getPlayers();
        for (var i = 0; i < players.length; ++i) {
            if (!players[i].readyToPlay) {
                return false;
            }
        }
        return true;
    };

    this.didEverybodyPlay = function() {

        var players = this.getPlayers();
        for (var i = 0; i < players.length; ++i) {
            if (!players[i].didPlay) {
                return false;
            }
        }
        return true;
    };
}]);