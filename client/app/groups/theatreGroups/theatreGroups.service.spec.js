'use strict';

describe('Service: theatreGroups', function () {

  // load the service's module
  beforeEach(module('theatreProjApp'));

  // instantiate service
  var theatreGroups;
  beforeEach(inject(function (_theatreGroups_) {
    theatreGroups = _theatreGroups_;
  }));

  it('should do something', function () {
    expect(!!theatreGroups).toBe(true);
  });

});
