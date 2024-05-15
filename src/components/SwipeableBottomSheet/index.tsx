import React, { useEffect, useRef } from 'react';
import { useDrag } from '@use-gesture/react';
import { a, useSpring, config } from '@react-spring/web';
import { Button } from '@deriv/quill-design';
import './swipeable-bottom-sheet.scss';

type SwipeableBottomSheetProps = {
  action_sheet_open: boolean;
  is_desktop?: boolean;
  primary_action?: {
    label: string;
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  };
  secondary_action?: {
    label: string;
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  };
  disable_drag?: boolean;
  on_close?: () => void;
};

const SwipeableBottomSheet: React.FC<SwipeableBottomSheetProps> = ({
  action_sheet_open,
  children,
  disable_drag = false,
  is_desktop = false,
  primary_action,
  secondary_action,
  on_close,
}) => {
  const height = window.innerHeight - 124;
  const [{ y }, api] = useSpring(() => ({ y: height }));
  const target = useRef(null);

  const open = ({ canceled }) => {
    api.start({ y: 0, immediate: false, config: canceled ? config.wobbly : config.stiff });
  };

  const close = (velocity = 0) => {
    api.start({ y: height, immediate: false, config: { ...config.stiff, velocity } });
    setTimeout(() => {
      on_close?.();
    }, 300);
  };

  useEffect(() => {
    if (action_sheet_open) open({ canceled: false });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [action_sheet_open]);

  useDrag(
    ({ last, velocity: [, vy], direction: [, dy], offset: [, oy], cancel, canceled }) => {
      if (oy < -70) cancel();
      if (last) oy > height * 0.5 || (vy > 0.5 && dy > 0) ? close(vy) : open({ canceled });
      else api.start({ y: oy, immediate: true });
    },
    {
      from: () => [0, y.get()],
      filterTaps: true,
      bounds: { top: 0 },
      rubberband: true,
      target,
    },
  );

  const display = y.to((py) => (py < height ? 'block' : 'none'));

  return (
    <React.Fragment>
      {action_sheet_open && (
        <div className={`action_sheet ${is_desktop ? 'desktop' : 'mobile'}`}>
          <a.div
            className={`action_sheet__main ${is_desktop ? 'desktop' : 'mobile'}`}
            style={{ display, bottom: !is_desktop ? 0 : '', y }}
          >
            {!is_desktop && !disable_drag && (
              <div
                data-testid='dt_action_sheet_handler'
                className='action_sheet__handler'
                ref={target}
              >
                <div className='action_sheet__handler_icon' />
              </div>
            )}

            <div className='action_sheet__body'>
              <div className='action_sheet__body__content'>{children}</div>
              <div className='action_sheet__body__footer'>
                {primary_action && (
                  <Button
                    colorStyle='black'
                    size='md'
                    variant='primary'
                    onClick={primary_action.onClick}
                  >
                    {primary_action.label}
                  </Button>
                )}
                {secondary_action && (
                  <Button
                    colorStyle='black'
                    size='md'
                    variant='secondary'
                    onClick={secondary_action.onClick}
                  >
                    {secondary_action.label}
                  </Button>
                )}
              </div>
            </div>
          </a.div>
        </div>
      )}
    </React.Fragment>
  );
};

export default SwipeableBottomSheet;
