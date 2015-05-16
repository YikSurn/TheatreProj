'use strict';

describe('Controller: ViewProjectCtrl', function () {

  // load the controller's module
  beforeEach(module('theatreProjApp'));

  var ViewProjectCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ViewProjectCtrl = $controller('ViewProjectCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
