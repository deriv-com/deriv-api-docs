import React, { act } from 'react';
import SchemaOneOfObjectContent from '..';
import userEvent from '@testing-library/user-event';
import { screen, render } from '@testing-library/react';

const fake_property = {
  title: 'test title',
  description: 'test description',
  oneOf: [
    {
      description: 'This is object 1',
      type: 'string',
    },
    {
      description: 'This is object 2',
      type: 'object',
      properties: {
        property_1: {
          description: 'item 1',
          type: 'string',
          enum: ['deposit', 'withdraw'],
        },
        property_2: {
          description: 'item 2',
          type: 'object',
          properties: {
            property_2_1: {
              description: 'item 3',
              type: 'string',
            },
          },
        },
      },
    },
  ],
  type: 'array',
};

const json_schema = {
  title: 'json schema',
  description: 'This stream_types description',
  type: 'string',
};

describe('SchemaOneOfObjectContent', () => {
  it('should be able to open a nested object item', async () => {
    render(
      <SchemaOneOfObjectContent
        key_title='test_item'
        property={fake_property}
        jsonSchema={json_schema}
      />,
    );

    const button = await screen.findByRole('button', { name: /object/i });
    expect(button).toBeVisible();

    await act(async () => {
      await userEvent.click(button);
    });

    const nested_property = await screen.findByText(/item 1/i);
    expect(nested_property).toBeVisible();

    await act(async () => {
      await userEvent.click(button);
    });

    expect(nested_property).not.toBeVisible();
  });

  it('should throw an error if the properties cannot be stringified', () => {
    const consoleOutput = [];
    const mockedError = (output) => consoleOutput.push(output);
    console.error = mockedError;

    const fake_property = {
      description: 'test description',
      type: 'array',
      title: 'test title',
      properties: {
        property_item: null,
      },
    };

    // creating intentionally a circular dependency,
    // triggering the try catch error mechanism.
    fake_property.properties.property_item = {
      properties: fake_property.properties,
    };

    render(
      <SchemaOneOfObjectContent
        key_title='test_item'
        property={fake_property}
        jsonSchema={json_schema}
      />,
    );

    expect(consoleOutput).toEqual([
      'There was an issue stringifying JSON data: ',
      'There was an issue stringifying JSON data: ',
    ]);
  });

  it('should display React JSON view upon clicking the source button {} ', async () => {
    render(
      <SchemaOneOfObjectContent
        key_title='test_item'
        property={fake_property}
        jsonSchema={json_schema}
      />,
    );

    const schema_button = await screen.findByText('{}');

    expect(schema_button).toBeVisible();

    await act(async () => {
      await userEvent.click(schema_button);
    });

    const schema = await screen.findByTitle('JSON');
    expect(schema).toBeInTheDocument();
  });
});
