'use strict';

angular.module('rawrApp')
  .controller('DashboardCtrl', function (socket, auth) {
    var self = this;
    console.log(auth);
    self.classCode = auth.user.accessCode;
    self.className = auth.user.class;

    self.questionsMapping = {};
    self.currentQuestion = '';

    self.clearQuestion = function() {
      self.currentQuestion = '';
    }

    socket.on('vote', function(voteSocket) {
      console.log(voteSocket);
      // if (voteSocket.agree) {
      //   self.questionsMapping[voteSocket.question] = self.questionsMapping[voteSocket.question] ? self.questionsMapping[voteSocket.question]++ : 1;
      // }
      //
      // if (self.questionsMapping[voteSocket.question] > 1) { //currently threshold of 1 before question appears on board
      //   self.currentQuestion = voteSocket.question;
      // }
      //
      // console.log(self.questionsMapping);
      // console.log(self.currentQuestion);

      if (voteSocket.agree) {
        self.currentQuestion = voteSocket.question;
      }


    });
  });
