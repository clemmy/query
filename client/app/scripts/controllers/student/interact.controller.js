'use strict';

angular.module('rawrApp')
  .controller('InteractCtrl', function (socket, auth) {
    var self = this;
    self.question = '';

    console.log(auth);

    socket.emit('init-message', { class: auth.user.class });
    // socket.join(auth.user.class);

    socket.on('question', function(question) {
      console.log(question);
    });

    self.broadcastQuestion = function(e) {
      e.preventDefault();

      socket.emit('question', {
        class: auth.user.class,
        username: auth.user.username,
        question: self.question
      });
    };
  });
