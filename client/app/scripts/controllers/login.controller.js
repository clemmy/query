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

         auth.user = {};
         auth.user.authenticated = true;
         auth.user.username = response.data.user;
         auth.user.userRole = response.data.role;
         auth.user.class = response.data.class;
         auth.user.accessCode = response.data.accessCode;

       } else {
         console.log('Login failed');
       }

     }, function(err) {
       console.log(err);
     });

    };
  });
