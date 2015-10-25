'use strict';

angular.module('rawrApp')
  .controller('YesNoCtrl', function (socket, auth, $scope) {
    var self = this;

    console.log($scope.ngDialogData);

    $scope.voteYes = function() {
      socket.emit('vote', {
        class: auth.user.class,
        username: auth.user.username,
        question: $scope.ngDialogData.question,
        agree: true
      });

      $scope.closeThisDialog();
    };

    $scope.voteNo = function() {
      socket.emit('vote', {
        class: auth.user.class,
        username: auth.user.username,
        question: $scope.ngDialogData.question,
        agree: false
      });

      $scope.closeThisDialog();
    };

  });
