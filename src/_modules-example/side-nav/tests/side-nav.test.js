'use strict';

import SideNav from '../side-nav';

describe('SideNav View', function() {

  beforeEach(() => {
    this.sideNav = new SideNav();
  });

  it('Should run a few assertions', () => {
    expect(this.sideNav);
  });

});
