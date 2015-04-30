'use strict';

angular.module('theatreProjApp')
  .factory('prodMeetings', ['$http', 'socket',
  function ($http, socket) {

    var o = {
      meetings : []
    };

    o.getAll = function() {
      return $http.get('api/prodmeetings').success(function(data) {
        angular.copy(data, o.meetings);
      });
    };

    o.create = function(prodMeeting) {
      return $http.post('api/prodmeetings', prodMeeting).success(function(data) {
        o.meetings.push(data);
      });
    };

    o.get = function(groupName, meetingTitle) {
      return $http.get('api/prodmeetings/' + groupName + '/' + meetingTitle).then(function(res) {
        return res.data;
      });
    };

    return o;
  }]);
