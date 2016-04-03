angular.module('debug', [])

    .factory('debug', function() {

        return {
            /**
             * Append message to debug message window
             * @param {string} message A message string
             */
            log : function(message) {

                console.log(message);
                $('.debug').append('<p>' + (typeof(message) == 'string' ? message : JSON.stringify(message)) + '</p>');
            }
        };
    });