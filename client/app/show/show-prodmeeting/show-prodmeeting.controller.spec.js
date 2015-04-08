'use strict';

describe('Controller: ShowProdmeetingCtrl', function () {

  // load the controller's module
  beforeEach(module('theatreProjApp'));

  var ShowProdmeetingCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ShowProdmeetingCtrl = $controller('ShowProdmeetingCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
