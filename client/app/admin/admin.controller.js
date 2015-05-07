'use strict';

angular.module('theatreProjApp')
  .controller('AdminCtrl', function ($scope, $http, Auth, User) {

    /*Use the User $resource to fetch all users*/
    $scope.users = User.query();

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

    /*Opens modal dialog with new controller*/
    $scope.viewProfile = function() {
        var modalInstance = $modal.open({
            templateUrl: 'app/admin/view-profile/view-profile.html',
            controller: 'ViewProfileCtrl',
            size: "lg",
            resolve: {
                user: function () {
                    return user; 
                }
            }
        });
    };
});