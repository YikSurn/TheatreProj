'use strict';

angular.module('theatreProjApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('show-prodmeeting-proforma', {
        url: '/show-prodmeeting-proforma',
        templateUrl: 'app/show/show-prodmeeting/show-prodmeeting-proforma/show-prodmeeting-proforma.html',
        controller: 'ShowProdmeetingProformaCtrl'
      });
  });