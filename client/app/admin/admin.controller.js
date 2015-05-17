'use strict';

angular.module('theatreProjApp')
  .controller('AdminCtrl', function ($scope, $http, $modal, Auth, User) {

    /*Use the User $resource to fetch all users*/
    $scope.users = User.query();

    $scope.isAdmin = Auth.isAdmin;

    $scope.delete = function(user) {
      var confUser = confirm("Are you sure you want to delete " + user.name + "?");
      if (confUser == true) {
        User.remove({ id: user._id });
        angular.forEach($scope.users, function(u, i) {
          if (u === user) {
            $scope.users.splice(i, 1);
          }
        });
      }
    };

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