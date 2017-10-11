'use strict';

import Team from '../team';

describe('Team View', function() {

  beforeEach(() => {
    this.team = new Team();
  });

  it('Should run a few assertions', () => {
    expect(this.team);
  });

});
