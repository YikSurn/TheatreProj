'use strict';

describe('Controller: ProductionMeetingCtrl', function () {

  // load the controller's module
  beforeEach(module('theatreProjApp'));

  var ProductionMeetingCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ProductionMeetingCtrl = $controller('ProductionMeetingCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
