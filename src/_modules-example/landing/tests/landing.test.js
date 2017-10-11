'use strict';

import Landing from '../landing';

describe('Landing View', function() {

  beforeEach(() => {
    this.landing = new Landing();
  });

  it('Should run a few assertions', () => {
    expect(this.landing);
  });

});
