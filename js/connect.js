var peerJSKey = 'r3gfvwpq3wx3l3di';
//var events = _.clone(Backbone.Events);

$(document).ready(function () {
    var peer = new Peer({key: peerJSKey});

    $('#big').toggle();
    connectRandom(peer,
        function (connection) {
            $('#spinner').toggle();
            //$('#big').toggle();
            //$('.submit_on_enter').toggle();
            window.send = function() {
                connection.send(window.tilearray);
                connection.send(window.score);
            }
            init(connection);
            connection.send(window.tilearray);
            $('.submit_on_enter').keydown(function (event) {
                if (event.keyCode == 13) {
                    var t = $('.submit_on_enter').val();
                    $('#text').append('<div id="myText">' + t + '<\div>');
                    //$('.submit_on_enter').reset();
                    connection.send(t);
                    return false;
                }
            });
            connection.on('data', function (t) {
                $('#text').append('<div id="friendText">' + t + '<\div>');
                //alert('a');
                if (t instanceof Array) {
                    window.tilearray = t;
                }
                else {
                    window.friendscore = t;
                }
                render();
            });
        },
        function () {
            console.log('No');
        }
    );

});
