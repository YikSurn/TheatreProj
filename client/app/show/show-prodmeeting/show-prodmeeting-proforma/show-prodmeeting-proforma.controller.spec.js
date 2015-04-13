'use strict';

describe('Controller: ShowProdmeetingProformaCtrl', function () {

  // load the controller's module
  beforeEach(module('theatreProjApp'));

  var ShowProdmeetingProformaCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ShowProdmeetingProformaCtrl = $controller('ShowProdmeetingProformaCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
