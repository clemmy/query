'use strict';

angular.module('rawrApp')
  .controller('YesNoCtrl', function (socket, auth) {
    var self = this;

    self.voteYes = function() {
      socket.emit('vote', {
        class: auth.user.class,
        username: auth.user.username,
        question: self.question,
        agree: true
      });
    };

    self.voteNo = function() {
      socket.emit('vote', {
        class: auth.user.class,
        username: auth.user.username,
        question: self.question,
        agree: false
      });
    };

  });
