'use strict';

angular.module('theatreProjApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('venue-allocation', {
        url: '/venue-allocation',
        templateUrl: 'app/venue-allocation/venue-allocation.html',
        controller: 'VenueAllocationCtrl'
      });
  });