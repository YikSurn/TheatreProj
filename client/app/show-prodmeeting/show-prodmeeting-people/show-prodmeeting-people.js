'use strict';

angular.module('theatreProjApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('show-prodmeeting-people', {
        url: '/show-prodmeeting-people',
        templateUrl: 'app/show-prodmeeting/show-prodmeeting-people/show-prodmeeting-people.html',
        controller: 'ShowProdmeetingPeopleCtrl'
      });
  });