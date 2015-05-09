'use strict';

describe('Controller: ViewGroupCtrl', function () {

  // load the controller's module
  beforeEach(module('theatreProjApp'));

  var ViewGroupCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ViewGroupCtrl = $controller('ViewGroupCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
