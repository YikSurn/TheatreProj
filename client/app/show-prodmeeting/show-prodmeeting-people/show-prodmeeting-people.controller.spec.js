'use strict';

describe('Controller: ShowProdmeetingPeopleCtrl', function () {

  // load the controller's module
  beforeEach(module('theatreProjApp'));

  var ShowProdmeetingPeopleCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ShowProdmeetingPeopleCtrl = $controller('ShowProdmeetingPeopleCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
