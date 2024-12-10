import React from 'react';
import { Carousel } from '../Carousel';
import { cleanup, render, screen } from '@site/src/test-utils';
import userEvent from '@testing-library/user-event';

const mockSlidePrev = jest.fn();
const mockSlideNext = jest.fn();

jest.mock('swiper/react', () => ({
  ...jest.requireActual('swiper/react'),
  useSwiper: jest.fn().mockImplementation(() => {
    return {
      slidePrev: mockSlidePrev,
      slideNext: mockSlideNext,
    };
  }),
}));

describe('Homepage carousel', () => {
  beforeEach(() => {
    render(<Carousel />);
  });

  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  it('Should render the carousel', () => {
    const carousel = screen.getByTestId('carousel-component');
    expect(carousel).toBeInTheDocument();
  });

  it('Should render the title', () => {
    const title = screen.getByText(/See what our clients say/i);
    expect(title).toBeInTheDocument();
  });

  it('Should render previous arrow', () => {
    const prev_arrow = screen.getByTestId('carousel-arrow-prev');
    expect(prev_arrow).toBeInTheDocument();
  });

  it('Should render next arrow', () => {
    const prev_arrow = screen.getByTestId('carousel-arrow-next');
    expect(prev_arrow).toBeInTheDocument();
  });

  it('Should render Alessandro slide', () => {
    const alessandro_slide = screen.getAllByText(/is one of the best APIs in the trading market/i);
    expect(alessandro_slide[0]).toBeInTheDocument();
  });

  it('Should render Thiago slide', () => {
    const thiago_slide = screen.getAllByText(/Probably the best API for making your business/i);
    expect(thiago_slide[0]).toBeInTheDocument();
  });

  it('Should render Josh slide', () => {
    const josh_slide = screen.getAllByText(/I have been using the deriv API for 13 years/i);
    expect(josh_slide[0]).toBeInTheDocument();
  });

  it('Should show author Alessandro', () => {
    const alessandro = screen.getAllByText(/Alessandro, CEO | Italy/i);
    expect(alessandro[0]).toBeInTheDocument();
  });

  it('Should show author Thiago', () => {
    const thiago = screen.getAllByText(/Thiago, entrepreneur | brazil/i);
    expect(thiago[0]).toBeInTheDocument();
  });

  it('Should show author Josh', () => {
    const josh = screen.getAllByText(/josh, trader | australia/i);
    expect(josh[0]).toBeInTheDocument();
  });

  it('Should go to prev slide on arrow left click', async () => {
    const leftArrow = screen.getByTestId('carousel-arrow-prev');

    await userEvent.click(leftArrow);

    expect(mockSlidePrev).toHaveBeenCalledTimes(1);
  });

  it('Should go to next slide on arrow right click', async () => {
    const rightArrow = screen.getByTestId('carousel-arrow-next');

    await userEvent.click(rightArrow);

    expect(mockSlideNext).toHaveBeenCalledTimes(1);
  });
});
