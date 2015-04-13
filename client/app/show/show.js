'use strict';

angular.module('theatreProjApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('show', {
        url: '/show',
        templateUrl: 'app/show/show.html',
        controller: 'ShowCtrl'
      });
  });