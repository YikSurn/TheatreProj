'use strict';

describe('Controller: NewProdMeetingCtrl', function () {

  // load the controller's module
  beforeEach(module('theatreProjApp'));

  var NewProdMeetingCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    NewProdMeetingCtrl = $controller('NewProdMeetingCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
