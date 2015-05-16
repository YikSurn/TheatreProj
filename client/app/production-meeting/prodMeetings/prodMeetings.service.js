'use strict';

// Factory for the production meetings

angular.module('theatreProjApp')
  .factory('prodMeetings', ['$http', 'socket',
  function ($http, socket) {

    var o = {
      meetings : [],
      meeting : {}
    };

    o.getAll = function() {
      return $http.get('api/prodmeetings').success(function (data) {
        angular.copy(data, o.meetings);
      });
    };

    o.get = function(groupName, meetingTitle) {
      return $http.get('api/prodmeetings/' + groupName + '/' + meetingTitle).success(function (data) {
        angular.copy(data, o.meeting);
      });
    };

    o.getForGroup = function(groupId) {
      var prods = [];
      for (var i=0; i < o.meetings.length; i++) {
        if (o.meetings[i].group._id == groupId) {
          prods.push(o.meetings[i]);
        }
      }
      return prods;
    };

    o.create = function(prodMeeting) {
      return $http.post('api/prodmeetings', prodMeeting).success(function (data) {
        o.meetings.push(data);
      });
    };

    o.update = function() {
      // Turn the group into just the id to be stored in database under production meeting
      var payload = angular.copy(o.meeting);
      payload.group = o.meeting.group._id;
      return $http.put('api/prodmeetings/' + o.meeting._id, payload).success(function (data) {
        // angular.copy(data, o.meeting);
      });
    };

    return o;
  }]);
