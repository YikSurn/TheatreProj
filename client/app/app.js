'use strict';

angular.module('theatreProjApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'btford.socket-io',
  'ui.router',
  'ui.bootstrap',
  'ui.bootstrap.datetimepicker'
])
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);
    $httpProvider.interceptors.push('authInterceptor');
  })

  .factory('authInterceptor', function ($rootScope, $q, $cookieStore, $location) {
    return {
      // Add authorization token to headers
      request: function (config) {
        config.headers = config.headers || {};
        if ($cookieStore.get('token')) {
          config.headers.Authorization = 'Bearer ' + $cookieStore.get('token');
        }
        return config;
      },

      // Intercept 401s and redirect you to login
      responseError: function(response) {
        if(response.status === 401) {
          $location.path('/login');
          // remove any stale tokens
          $cookieStore.remove('token');
          return $q.reject(response);
        }
        else {
          return $q.reject(response);
        }
      }
    };
  })

  .run(function ($rootScope, Auth, $timeout, $state) {

    $rootScope.spinner = false;

    $rootScope.hideSpinner = function () {
      $rootScope.spinner = false;
      $timeout.cancel($rootScope.timeoutPromise);
    }

    // Redirect to login if route requires auth and you're not logged in
    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
      Auth.isLoggedInAsync(function(loggedIn) {
        if (toState.authenticate && !loggedIn) {
          event.preventDefault();
          $state.go('login');
        }
        else {
          $rootScope.timeoutPromise = $timeout(function () {
            $rootScope.spinner = true;
          }, 50);
        }
      });

    });

    $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
      // Autoscroll to top of page
      document.body.scrollTop = document.documentElement.scrollTop = 0;

      $rootScope.hideSpinner();

    });

    $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams) {
      // Autoscroll to top of page
      document.body.scrollTop = document.documentElement.scrollTop = 0;

      $rootScope.hideSpinner();

    });
  });