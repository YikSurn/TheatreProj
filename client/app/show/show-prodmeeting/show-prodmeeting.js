'use strict';

angular.module('theatreProjApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('show-prodmeeting', {
        url: '/show-prodmeeting',
        templateUrl: 'app/show/show-prodmeeting/show-prodmeeting.html',
        controller: 'ShowProdmeetingCtrl'
      });
  });