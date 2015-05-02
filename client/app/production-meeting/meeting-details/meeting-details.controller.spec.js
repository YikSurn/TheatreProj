'use strict';

describe('Controller: MeetingDetailsCtrl', function () {

  // load the controller's module
  beforeEach(module('theatreProjApp'));

  var MeetingDetailsCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MeetingDetailsCtrl = $controller('MeetingDetailsCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
