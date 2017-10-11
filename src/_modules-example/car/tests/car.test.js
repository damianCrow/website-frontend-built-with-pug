'use strict';

import Car from '../car';

describe('Car View', function() {

  beforeEach(() => {
    this.car = new Car();
  });

  it('Should run a few assertions', () => {
    expect(this.car);
  });

});
