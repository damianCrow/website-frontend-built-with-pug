'use strict';

import Track from '../track';

describe('Track View', function() {

  beforeEach(() => {
    this.track = new Track();
  });

  it('Should run a few assertions', () => {
    expect(this.track);
  });

});
