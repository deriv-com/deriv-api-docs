import React from 'react';
import { cleanup, render } from '@site/src/test-utils';
import type { RenderResult } from '@site/src/test-utils';
import HomepageFeatures from '..';

describe('Home Page', () => {
  let render_result: RenderResult;
  beforeEach(() => {
    render_result = render(<HomepageFeatures />);
  });

  afterEach(() => {
    cleanup();
  });

  it('should render the page section', () => {
    const { container } = render_result;
    const main_section = container.querySelector('main');
    expect(main_section).toBeInTheDocument();
  });

  it('should render section with features class', () => {
    const { container } = render_result;
    const main_section = container.querySelector('main');
    expect(main_section).toBeVisible();
  });
});
