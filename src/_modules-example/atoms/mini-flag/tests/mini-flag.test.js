'use strict';

import MiniFlag from '../mini-flag';

describe('MiniFlag View', function() {

  beforeEach(() => {
    this.miniFlag = new MiniFlag();
  });

  it('Should run a few assertions', () => {
    expect(this.miniFlag);
  });

});
