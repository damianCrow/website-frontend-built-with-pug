'use strict';

import Burger from '../burger';

describe('Burger View', function() {

  beforeEach(() => {
    this.burger = new Burger();
  });

  it('Should run a few assertions', () => {
    expect(this.burger);
  });

});
