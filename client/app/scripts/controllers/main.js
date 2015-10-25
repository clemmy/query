'use strict';

/**
 * @ngdoc function
 * @name rawrApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the rawrApp
 */
angular.module('rawrApp')
  .controller('MainCtrl', function (socket) {
    // console.log(socket);
    //
    // socket.emit('chat message', { a: 'b' });

    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
