'use strict';

angular.module('theatreProjApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('show-new', {
        url: '/show-new',
        templateUrl: 'app/show/show-new/show-new.html',
        controller: 'ShowNewCtrl'
      });
  });