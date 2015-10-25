'use strict';

angular.module('rawrApp')
  .controller('LoginCtrl', function ($http, $location, auth) {
    var self = this;

    self.formData = {};

    self.login = function(e) {
      e.preventDefault();

     $http.post('/api/login', self.formData).then(function(response) {
       console.log(response);

       if (response.data.authenticated) {
         if (response.data.role === 'student') {
           $location.path( "/student/interact" );
         } else if (response.data.role === 'prof') {
           $location.path( "/prof/dashboard" );
         } else {
           console.log('weird role');
         }

         auth.user.authenticated = true;
         auth.user.username = response.data.username;
         auth.user.userRole = response.data.userRole;

       } else {
         console.log('Login failed');
       }

     }, function(err) {
       console.log(err);
     });

    };
  });
