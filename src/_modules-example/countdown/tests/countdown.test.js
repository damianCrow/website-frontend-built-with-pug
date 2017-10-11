'use strict';

import Countdown from '../countdown';

describe('Countdown View', function() {

  beforeEach(() => {
    this.countdown = new Countdown();
  });

  it('Should run a few assertions', () => {
    expect(this.countdown);
  });

});
