'use strict';

angular.module('theatreProjApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('view-profile', {
        templateUrl: 'app/admin/view-profile/view-profile.html',
        controller: 'ViewProfileCtrl'
      });
  });