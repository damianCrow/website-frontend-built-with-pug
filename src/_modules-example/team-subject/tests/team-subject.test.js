'use strict';

import TeamSubject from '../team-subject';

describe('TeamSubject View', function() {

  beforeEach(() => {
    this.teamSubject = new TeamSubject();
  });

  it('Should run a few assertions', () => {
    expect(this.teamSubject);
  });

});
