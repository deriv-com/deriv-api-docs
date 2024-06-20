import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Footer from '../index';

describe('Footer Component', () => {
  it('should render the footer with all its sections', () => {
    render(<Footer />);
    expect(screen.getByTestId('footer-text')).toBeInTheDocument();
    expect(screen.getByTestId('section')).toBeInTheDocument();
  });

  it('navigates to community page on community button click', () => {
    delete window.location;
    window.location = { href: '' } as any;
    render(<Footer />);
    const communityButton = screen.getByText(/Join our community/);
    fireEvent.click(communityButton);
    expect(window.location.href).toBe('https://community.deriv.com/');
  });

  it('navigates to Telegram when Telegram button is clicked', () => {
    delete window.location;
    window.location = { href: '' } as any;
    render(<Footer />);
    const telegramButton = screen.getByText(/Telegram/);
    fireEvent.click(telegramButton);
    expect(window.location.href).toBe('https://t.me/derivdotcomofficial');
  });

  it('navigates to respective email when email button clicked', () => {
    delete window.location;
    window.location = { href: '' } as any;
    render(<Footer />);
    const emailButton = screen.getByText(/Send an email/);
    fireEvent.click(emailButton);
    expect(window.location.href).toBe('mailto:api-support@deriv.com');
  });
});
