'use strict';

describe('Service: prodMeetings', function () {

  // load the service's module
  beforeEach(module('theatreProjApp'));

  // instantiate service
  var prodMeetings;
  beforeEach(inject(function (_prodMeetings_) {
    prodMeetings = _prodMeetings_;
  }));

  it('should do something', function () {
    expect(!!prodMeetings).toBe(true);
  });

});
