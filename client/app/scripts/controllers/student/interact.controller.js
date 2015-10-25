'use strict';

angular.module('rawrApp')
  .controller('InteractCtrl', function (socket, auth, ngDialog) {
    var self = this;
    self.question = '';

    console.log(auth);

    socket.emit('init-message', { class: auth.user.class });
    // socket.join(auth.user.class);

    socket.on('question', function(question) {
      console.log(question);
      self.question = question.question
      openModal();
    });

    self.broadcastQuestion = function(e) {
      e.preventDefault();

      socket.emit('question', {
        class: auth.user.class,
        username: auth.user.username,
        question: self.question
      });
    };

    function openModal() {
      ngDialog.open({
        template: 'views/student/yesNoModal.html',
        controller: 'YesNoCtrl',
        data: {
          question: self.question
        }
      });
    };

  });
