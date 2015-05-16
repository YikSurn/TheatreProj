'use strict';

angular.module('theatreProjApp')
  .factory('prodMeetings', ['$http', 'socket',
  function ($http, socket) {

    var o = {
      meetings : [],
      meeting : {
        
      }
    };

    o.getAll = function() {
      return $http.get('api/prodmeetings').success(function (data) {
        angular.copy(data, o.meetings);
      });
    };

    o.create = function(prodMeeting) {
      return $http.post('api/prodmeetings', prodMeeting).success(function (data) {
        o.meetings.push(data);
      });
    };

    o.get = function(groupName, meetingTitle) {
      return $http.get('api/prodmeetings/' + groupName + '/' + meetingTitle).success(function (data) {
        angular.copy(data, o.meeting);
      });
    };

    o.update = function() {
      var payload = angular.copy(o.meeting);
      payload.group = o.meeting.group._id;
      return $http.put('api/prodmeetings/' + o.meeting._id, payload).success(function (data) {
        // angular.copy(data, o.meeting);
        console.log('success');
      });
    };

    return o;
  }]);
