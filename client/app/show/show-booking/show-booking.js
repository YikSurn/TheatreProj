'use strict';

angular.module('theatreProjApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('show-booking', {
        url: '/show-booking',
        templateUrl: 'app/show/show-booking/show-booking.html',
        controller: 'ShowBookingCtrl'
      });
  });