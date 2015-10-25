'use strict';

angular.module('rawrApp')
  .controller('EnrolCtrl', function () {
     var self = this;

     self.formData = {};

     self.signUp = function(e) {
       e.preventDefault();

       console.log(self.formData);
       
     };

  });
