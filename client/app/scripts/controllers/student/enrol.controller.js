'use strict';

angular.module('rawrApp')
  .controller('EnrolCtrl', function ($http, $location, auth) {
     var self = this;

     self.formData = {};

     self.signUp = function(e) {
       e.preventDefault();

      $http.post('/api/users', self.formData).then(function(response) {
        console.log(response);

        if (self.formData.userRole === 'prof') {
          $location.path( "/prof/dashboard" );
        } else if (self.formData.userRole === 'student') {
          $location.path( "/student/interact" );
        } else {
          console.log('weird role');
        }

        auth.user = {};
        auth.user.authenticated = true;
        auth.user.username = response.data.data.username;
        auth.user.userRole = response.data.data.userRole;
        auth.user.class = response.data.data.class;

      }, function(err) {
        console.log(err);
      });

     };

  });
