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
    window.location = "http://queryhacks.herokuapp.com/splash";
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
