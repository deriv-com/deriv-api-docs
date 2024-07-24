import React, { act } from 'react';
import SchemaProperties from '..';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';

describe('SchemaProperties', () => {
  it('should throw an error when invalid JSON properties are passed', async () => {
    const consoleOutput = [];
    const mockedError = (output) => consoleOutput.push(output);
    console.error = mockedError;

    const fake_properties = {
      info: 'test',
      default: null,
      properties: null,
    };

    // creating intentionally a circular dependency,
    // triggering the try catch error mechanism.
    fake_properties.default = {
      default: fake_properties,
    };

    render(<SchemaProperties jsonSchema={fake_properties} />);

    expect(consoleOutput).toEqual(['There was an issue stringifying JSON data: ']);
  });

  it('should open the schema when pressing the source button', async () => {
    const fake_properties = {
      info: 'test',
      default: null,
      properties: null,
    };

    render(<SchemaProperties jsonSchema={fake_properties} />);

    const schema_button = await screen.findByText('{}');

    expect(schema_button).toBeVisible();

    await act(async () => {
      await userEvent.click(schema_button);
    });

    const schema = await screen.findByTitle('JSON');
    expect(schema).toBeVisible();
  });
});
