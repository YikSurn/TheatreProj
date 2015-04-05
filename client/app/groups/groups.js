'use strict';

angular.module('0010FullstackMongoApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('groups', {
        url: '/groups',
        templateUrl: 'app/groups/groups.html',
        controller: 'GroupsCtrl'
      });
  });