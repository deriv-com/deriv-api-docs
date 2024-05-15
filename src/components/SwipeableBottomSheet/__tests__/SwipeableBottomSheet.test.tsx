import React from 'react';
import { cleanup, createEvent, fireEvent, render, screen } from '@testing-library/react';
import SwipeableBottomSheet from '..';

jest.useFakeTimers();

function patchCreateEvent(createEvent: any) {
  // patching createEvent for pointer events to work from jsdom
  for (const key in createEvent) {
    if (key.indexOf('pointer') === 0) {
      const fn = createEvent[key.replace('pointer', 'mouse')];
      if (!fn) continue;
      createEvent[key] = function (type, { pointerId = 1, pointerType = 'mouse', ...rest } = {}) {
        const event = fn(type, rest);
        event.pointerId = pointerId;
        event.pointerType = pointerType;
        const eventType = event.type;
        Object.defineProperty(event, 'type', {
          get: function () {
            return eventType.replace('mouse', 'pointer');
          },
        });
        return event;
      };
    }
  }
}
patchCreateEvent(createEvent);

const onCancel = jest.fn();
const onConfigure = jest.fn();

describe('SwipeableBottomSheet', () => {
  const renderComponent = ({
    app_register_modal_open,
    is_desktop = undefined,
    disable_drag = undefined,
    on_close = undefined,
  }) => (
    <SwipeableBottomSheet
      action_sheet_open={app_register_modal_open}
      primary_action={{
        label: 'Configure now',
        onClick: onCancel,
      }}
      secondary_action={{
        label: 'Maybe later',
        onClick: onConfigure,
      }}
      is_desktop={is_desktop}
      disable_drag={disable_drag}
      on_close={on_close}
    >
      <div>Test content</div>
    </SwipeableBottomSheet>
  );

  afterEach(() => {
    cleanup();
  });

  it('should render the swipeable bottom sheet', () => {
    render(renderComponent({ app_register_modal_open: true }));
    const label = screen.getByText('Test content');
    expect(label).toBeInTheDocument();
  });

  it('should render the modal in desktop', () => {
    render(renderComponent({ app_register_modal_open: true, is_desktop: true }));
    const handlerElement = screen.queryByTestId('dt_action_sheet_handler');
    expect(handlerElement).not.toBeInTheDocument();
  });

  it('should render the bottom sheet in mobile', () => {
    render(renderComponent({ app_register_modal_open: true, is_desktop: false }));
    const handlerElement = screen.getByTestId('dt_action_sheet_handler');
    expect(handlerElement).toBeInTheDocument();
  });

  it('should close the bottom sheet on mobile if handler is dragged to the bottom', () => {
    const component = renderComponent({ app_register_modal_open: true, on_close: onCancel });
    const { rerender } = render(component);
    rerender(component);
    const handlerElement = screen.getByTestId('dt_action_sheet_handler');
    fireEvent.pointerDown(handlerElement, {
      pointerId: 1,
      clientX: 0,
      clientY: 100,
      buttons: 1,
    });
    fireEvent.pointerMove(handlerElement, {
      pointerId: 1,
      clientX: 30,
      clientY: 10,
      buttons: 1,
    });
    fireEvent.pointerUp(handlerElement, {
      pointerId: 1,
      clientX: 30,
      clientY: 10,
      buttons: 1,
    });
    jest.advanceTimersByTime(600);
    expect(onCancel).toBeCalled();
  });

  it('should not drag the bottom sheet on mobile if drag is disabled', () => {
    const component = renderComponent({
      app_register_modal_open: true,
      on_close: onCancel,
      disable_drag: true,
    });
    const { rerender } = render(component);
    rerender(component);
    const handlerElement = screen.queryByTestId('dt_action_sheet_handler');
    expect(handlerElement).not.toBeInTheDocument();
  });
});
