'use strict';

describe('Controller: MeetingWizardCtrl', function () {

  // load the controller's module
  beforeEach(module('theatreProjApp'));

  var MeetingWizardCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MeetingWizardCtrl = $controller('MeetingWizardCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
