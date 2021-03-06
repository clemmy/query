'use strict';

/**
 * @ngdoc overview
 * @name rawrApp
 * @description
 * # rawrApp
 *
 * Main module of the application.
 */
angular
  .module('rawrApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'btford.socket-io',
    'ngDialog'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'loginCtrl'
      })
      .when('/enrol', {
        templateUrl: 'views/enrol.html',
        controller: 'EnrolCtrl',
        controllerAs: 'enrolCtrl'
      })
      .when('/prof/dashboard', {
        templateUrl: 'views/prof/dashboard.html',
        controller: 'DashboardCtrl',
        controllerAs: 'dashboardCtrl'
      })
      .when('/student/interact', {
        templateUrl: 'views/student/interact.html',
        controller: 'InteractCtrl',
        controllerAs: 'interactCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .factory('socket', function (socketFactory) {
    return socketFactory();
  })
  .run(function($rootScope, $location, auth) {
    $rootScope.getCurrentLocation = function() {
      return $location.path();
    };

    $rootScope.getUserRole = function() {
      return auth.user.userRole;
    };

    $rootScope.isLoggedIn = function() {
      return auth.user.authenticated;
    }
  });
