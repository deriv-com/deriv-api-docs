import React from 'react';
import { StandaloneChevronDownRegularIcon } from '@deriv/quill-icons';
import * as Accordion from '@radix-ui/react-accordion';
import './custom-accordion.scss';

type TCustomAccordionProps = {
  items: Array<{ header: string; content: React.ReactNode }>;
};

const AccordionTrigger: React.FC = ({ children }) => (
  <Accordion.Header className='accordion_header'>
    <Accordion.Trigger className='accordion_header__trigger'>
      {children}
      <StandaloneChevronDownRegularIcon iconSize='md' className='accordion_chevron' />
    </Accordion.Trigger>
  </Accordion.Header>
);

const AccordionContent: React.FC = ({ children }) => (
  <Accordion.Content className='accordion_content'>
    <div className='accordion_content__text'>{children}</div>
  </Accordion.Content>
);

const CustomAccordion: React.FC<TCustomAccordionProps> = ({ items }) => (
  <Accordion.Root className='accordion_root' type='single' defaultValue='item-1' collapsible>
    {items.map((item) => (
      <Accordion.Item className='accordion_root__item' key={item.header} value={item.header}>
        <AccordionTrigger>{item.header}</AccordionTrigger>
        <AccordionContent>{item.content}</AccordionContent>
      </Accordion.Item>
    ))}
  </Accordion.Root>
);

export default CustomAccordion;
