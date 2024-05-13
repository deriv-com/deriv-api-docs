import React, { act } from 'react';
import userEvent from '@testing-library/user-event';
import { screen, render } from '@testing-library/react';
import { TEnumStreamType } from '@site/src/types';
import StreamTypesObject from '..';

describe('StreamTypesObject', () => {
  const _enum: TEnumStreamType = [
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
    'website_status',
  ];
  const json_schema = {
    stream_types: {
      description: 'This stream_types description',
      type: 'string',
      enum: _enum,
    },
  };

  it('should render button that opens jsonschema', async () => {
    render(<StreamTypesObject definitions={json_schema} />);

    const schema_button = await screen.findByText('{}');

    expect(schema_button).toBeVisible();

    await act(async () => {
      await userEvent.click(schema_button);
    });

    const schema = await screen.findByTitle('JSON');
    expect(schema).toBeVisible();
  });

  it('should render the header of the object', () => {
    render(<StreamTypesObject definitions={json_schema} />);

    const header_title = screen.getAllByText(/stream_types/)[0];
    expect(header_title).toBeInTheDocument();

    const header_description = screen.getByText(/This stream_types description/i);
    expect(header_description).toBeInTheDocument();
  });

  it('should render the body of StreamTypesObject', () => {
    render(<StreamTypesObject definitions={json_schema} />);

    const type = screen.getByText(/enum/i);
    expect(type).toBeInTheDocument();

    const enum_type = screen.getByText(/string/i);
    expect(enum_type).toBeInTheDocument();

    json_schema.stream_types.enum.map((item) => {
      const enum_name = screen.getByText(item);
      expect(enum_name).toBeInTheDocument();
    });
  });
});
