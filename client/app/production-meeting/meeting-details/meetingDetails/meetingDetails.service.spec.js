'use strict';

describe('Service: meetingDetails', function () {

  // load the service's module
  beforeEach(module('theatreProjApp'));

  // instantiate service
  var meetingDetails;
  beforeEach(inject(function (_meetingDetails_) {
    meetingDetails = _meetingDetails_;
  }));

  it('should do something', function () {
    expect(!!meetingDetails).toBe(true);
  });

});
