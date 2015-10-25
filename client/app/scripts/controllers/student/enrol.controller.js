'use strict';

angular.module('rawrApp')
  .controller('EnrolCtrl', function ($http) {
     var self = this;

     self.formData = {};

     self.signUp = function(e) {
       e.preventDefault();

      $http.post('/api/users', self.formData).then(function(response) {
        console.log(response);
      }, function(err) {
        console.log(err);
      });

     };

  });
