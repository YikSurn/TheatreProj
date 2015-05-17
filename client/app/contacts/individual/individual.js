'use strict';

angular.module('theatreProjApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('individual', {
        url: '/contacts/individual',
        templateUrl: 'app/contacts/individual/individual.html',
        controller: 'IndividualCtrl'
      });
  });