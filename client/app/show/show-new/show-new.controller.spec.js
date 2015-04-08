'use strict';

describe('Controller: ShowNewCtrl', function () {

  // load the controller's module
  beforeEach(module('theatreProjApp'));

  var ShowNewCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ShowNewCtrl = $controller('ShowNewCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
