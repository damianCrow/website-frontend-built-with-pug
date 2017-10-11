'use strict';

import RaceHub from '../race-hub';

describe('RaceHub View', function() {

  beforeEach(() => {
    this.raceHub = new RaceHub();
  });

  it('Should run a few assertions', () => {
    expect(this.raceHub);
  });

});
