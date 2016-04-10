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
}]);