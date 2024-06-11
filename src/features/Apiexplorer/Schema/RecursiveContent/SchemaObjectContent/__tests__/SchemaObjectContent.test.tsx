import React, { act } from 'react';
import SchemaObjectContent from '..';
import userEvent from '@testing-library/user-event';
import { screen, render } from '@testing-library/react';

const fake_properties = {
  test_item: {
    description: 'test description',
    type: 'array',
    defaultValue: 'default_test',
    pattern: 'some_test_pattern',
    examples: ['example1', 'example2'],
    enum: ['test1', 'test2'],
    title: 'test title',
    properties: {
      test_property: {
        description: 'property description',
        type: 'string',
      },
    },
  },
};

const stream_types_schema = {
  properties: {
    test_property: {
      description: 'property description',
      oneOf: 'this is oneOf key',
    },
  },
  definitions: {
    stream_types: {
      description: 'This stream_types description',
      type: 'string',
      enum: [
        'balance',
        'candles',
        'cashier_payments',
        'p2p_advert',
        'p2p_advertiser',
        'p2p_order',
        'proposal',
        'proposal_open_contract',
        'ticks',
        'transaction',
        'trading_platform_asset_listing',
        'website_status',
        'p2p_settings',
        'crypto_estimations',
      ],
    },
  },
};

describe('SchemaObjectContent', () => {
  it('should be able to open a nested object item', async () => {
    render(<SchemaObjectContent key_value='test_item' properties={fake_properties} />);

    const button = await screen.findByRole('button', { name: /test_item/i });
    expect(button).toBeVisible();

    await act(async () => {
      await userEvent.click(button);
    });

    const nested_property = await screen.findByText(/property description/i);
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

    const fake_properties = {
      test_item: {
        description: 'test description',
        type: 'array',
        defaultValue: 'default_test',
        pattern: 'some_test_pattern',
        examples: ['example1', 'example2'],
        enum: ['test1', 'test2'],
        title: 'test title',
        properties: null,
      },
    };

    // creating intentionally a circular dependency,
    // triggering the try catch error mechanism.
    fake_properties.test_item.properties = {
      test_item: fake_properties.test_item,
    };

    render(<SchemaObjectContent key_value='test_item' properties={fake_properties} />);

    expect(consoleOutput).toEqual(['There was an issue stringifying JSON data: ']);
  });

  it('should throw an error if the properties cannot be stringified', async () => {
    const consoleOutput = [];
    const mockedError = (output) => consoleOutput.push(output);
    console.error = mockedError;

    const fake_properties = {
      test_item: {
        description: 'test description',
        type: 'array',
        defaultValue: 'default_test',
        pattern: 'some_test_pattern',
        examples: ['example1', 'example2'],
        enum: ['test1', 'test2'],
        title: 'test title',
        properties: null,
      },
    };

    render(<SchemaObjectContent key_value='test_item' properties={fake_properties} />);

    const schema_button = await screen.findByText('{}');

    expect(schema_button).toBeVisible();

    await act(async () => {
      await userEvent.click(schema_button);
    });

    const schema = await screen.findByTitle('JSON');
    expect(schema).toBeInTheDocument();
  });

  it('should open StreamTypesObject upon clicking stream_types button', async () => {
    render(
      <SchemaObjectContent
        key='test_property'
        key_value='test_property'
        properties={stream_types_schema.properties}
        jsonSchema={stream_types_schema}
        is_stream_types={true}
      />,
    );

    const button = await screen.findByRole('button', { name: /stream_types/i });
    expect(button).toBeVisible();

    await act(async () => {
      await userEvent.click(button);
    });

    const streamTypesObject = await screen.getByTestId('dt_stream_types_object');
    expect(streamTypesObject).toBeVisible();
  });
});
