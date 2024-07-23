import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import React, { act } from 'react';
import EndPoint from '../Endpoint';
import userEvent from '@testing-library/user-event';
import { DEFAULT_WS_SERVER } from '@site/src/utils/constants';

describe('Endpoint', () => {
  beforeEach(() => {
    render(<EndPoint />);
  });

  afterEach(cleanup);

  it('should render form properly', () => {
    const endpoint = screen.getByRole('form');
    expect(endpoint).toBeInTheDocument();
  });
  it('should render title properly', () => {
    const endpoint_text = screen.getByRole('heading');
    expect(endpoint_text).toBeInTheDocument();
    expect(endpoint_text).toHaveTextContent('Change API endpoint');
  });

  it('should have default values in input fields', () => {
    const server = screen.getByPlaceholderText('e.g. ws.derivws.com');
    const app_id = screen.getByPlaceholderText('e.g. 9999');
    expect(server).toHaveValue(DEFAULT_WS_SERVER);

    expect(app_id).toHaveValue('35074');
  });

  it('validate user inputs, and provides error messages for app id field', async () => {
    const app_id = screen.getByPlaceholderText('e.g. 9999');

    await act(async () => {
      await userEvent.clear(app_id);
      await userEvent.type(app_id, 'abcd');
    });

    const app_id_error = screen.getByTestId('app_id_error');

    expect(app_id_error).toHaveTextContent('Please enter a valid app ID');
  });

  it('validate user inputs, and provides error messages for server field', async () => {
    const server = screen.getByPlaceholderText('e.g. ws.derivws.com');

    await act(async () => {
      await userEvent.clear(server);
      await userEvent.type(server, 'qa10@deriv.com');
    });

    const server_error = screen.getByTestId('server_error');

    expect(server_error).toHaveTextContent('Please enter a valid server URL');
  });

  it('should validate submit button functionality', async () => {
    const server = screen.getByPlaceholderText('e.g. ws.derivws.com');
    const app_id = screen.getByPlaceholderText('e.g. 9999');
    const form = screen.getByRole('form');

    await act(async () => {
      await userEvent.clear(server);
      await userEvent.type(server, 'blue.derivws.com');

      await userEvent.clear(app_id);
      await userEvent.type(app_id, '31063');

      fireEvent.submit(form);
    });

    expect(server).toHaveValue('blue.derivws.com');
    expect(app_id).toHaveValue('31063');
  });

  it('Should remove app_id and server_url from localstorage on reset button click and reload the page', async () => {
    const reset_button = screen.getByRole('button', { name: /reset/i });

    await act(async () => {
      await userEvent.click(reset_button);
    });

    expect(localStorage.removeItem).toHaveBeenCalledTimes(2);
    expect(localStorage.removeItem).toHaveBeenCalledWith('config.app_id');
    expect(localStorage.removeItem).toHaveBeenCalledWith('config.server_url');
    expect(window.location.reload).toHaveBeenCalledTimes(1);
  });

  it('Should have submit button as disabled on form error', async () => {
    const app_id = screen.getByPlaceholderText('e.g. 9999');
    const submit_button = screen.getByRole('button', { name: /submit/i });

    await act(async () => {
      await userEvent.clear(app_id);
      await userEvent.type(app_id, 'abcd');
    });
    expect(submit_button).toBeDisabled();
  });

  it('Should have submit button enabled with no errors on the from', async () => {
    const server = screen.getByPlaceholderText('e.g. ws.derivws.com');
    const app_id = screen.getByPlaceholderText('e.g. 9999');
    const submit_button = screen.getByRole('button', { name: /submit/i });

    await act(async () => {
      await userEvent.clear(server);
      await userEvent.type(server, 'blue.derivws.com');

      await userEvent.clear(app_id);
      await userEvent.type(app_id, '31063');
    });

    expect(submit_button).toBeEnabled();
  });
});
