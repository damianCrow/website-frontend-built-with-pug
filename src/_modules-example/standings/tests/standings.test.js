'use strict';

import Standings from '../standings';

describe('Standings View', function() {

  beforeEach(() => {
    this.standings = new Standings();
  });

  it('Should run a few assertions', () => {
    expect(this.standings);
  });

});
