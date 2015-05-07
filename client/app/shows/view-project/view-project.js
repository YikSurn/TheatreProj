'use strict';

angular.module('theatreProjApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('view-project', {
        url: '/view-project',
        templateUrl: 'app/shows/view-project/view-project.html',
        controller: 'ViewProjectCtrl'
      });
  });