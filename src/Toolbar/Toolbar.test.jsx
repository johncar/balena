import React from 'react';
import TestRenderer from 'react-test-renderer';

import Toolbar from './Toolbar';

describe('Toolbar', () => {
  it('should render correctly', () => {
    const tree = TestRenderer.create(<Toolbar />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
