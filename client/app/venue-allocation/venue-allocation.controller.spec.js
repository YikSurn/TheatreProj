'use strict';

describe('Controller: VenueAllocationCtrl', function () {

  // load the controller's module
  beforeEach(module('theatreProjApp'));

  var VenueAllocationCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    VenueAllocationCtrl = $controller('VenueAllocationCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
