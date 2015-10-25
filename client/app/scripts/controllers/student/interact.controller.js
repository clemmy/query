'use strict';

angular.module('rawrApp')
  .controller('InteractCtrl', function (socket, auth) {
    console.log(auth);

    socket.emit('init-message', { class: auth.user.class });
  });
