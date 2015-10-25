'use strict';

angular.module('rawrApp')
  .controller('DashboardCtrl', function (socket, auth) {
    var self = this;

    self.classCode = auth.user.accessCode;
    self.className = auth.user.class;

    socket.on('vote', function(voteSocket) {
      console.log(voteSocket);
    });
  });
