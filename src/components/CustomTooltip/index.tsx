import React from 'react';
import * as Tooltip from '@radix-ui/react-tooltip';
import './custom-tooltip.scss';

const CustomTooltip: React.FC<{ text: React.ReactNode }> = ({ children, text }) => {
  return (
    <Tooltip.Provider delayDuration={0}>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>{children}</Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content side='bottom' className='tooltip_content'>
            {text}
            <Tooltip.Arrow className='tooltip_arrow' />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
};

export default CustomTooltip;
