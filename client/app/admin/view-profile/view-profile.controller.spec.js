'use strict';

describe('Controller: ViewProfileCtrl', function () {

  // load the controller's module
  beforeEach(module('theatreProjApp'));

  var ViewProfileCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ViewProfileCtrl = $controller('ViewProfileCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
