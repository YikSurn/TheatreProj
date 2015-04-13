'use strict';

describe('Controller: ShowBookingCtrl', function () {

  // load the controller's module
  beforeEach(module('theatreProjApp'));

  var ShowBookingCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ShowBookingCtrl = $controller('ShowBookingCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
