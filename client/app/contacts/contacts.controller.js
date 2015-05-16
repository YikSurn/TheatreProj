'use strict';

angular.module('theatreProjApp')
  .controller('ContactsCtrl', function ($scope, $http,$modal, Auth, User) {
    $scope.users = User.query();
    $scope.isAdmin = Auth.isAdmin;
     $scope.detail = function(user) {
        var modalInstance = $modal.open({
            templateUrl: 'app/contacts/individual/individual.html',
            controller: 'IndividualCtrl',
            size: "md",
            resolve: {
                user: function () {
                    return user; 
                }
            }
        });
    };
  });
