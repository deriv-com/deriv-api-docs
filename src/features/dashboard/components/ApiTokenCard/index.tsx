import React, { useState, useMemo } from 'react';
import { UseFormRegister } from 'react-hook-form';
import clsx from 'clsx';
import useDeviceType from '@site/src/hooks/useDeviceType';
import CustomCheckbox from '@site/src/components/CustomCheckbox';
import { Text, Heading, Modal, SectionMessage } from '@deriv-com/quill-ui';
import { StandaloneCircleExclamationRegularIcon } from '@deriv/quill-icons';
import { TApiTokenForm, TApiTokenFormItemsNames } from '../ApiTokenForm/api-token.form';
import styles from './api-token.card.module.scss';

interface IApiTokenCardProps {
  register: UseFormRegister<TApiTokenForm>;
  name: TApiTokenFormItemsNames;
  label: string;
  description: string;
}

const ApiTokenCard = ({ register, name, label, description, ...rest }: IApiTokenCardProps) => {
  const [isAdminChecked, setIsAdminChecked] = useState(false);
  const [isAdminPopupVisible, setIsAdminPopupVisible] = useState(false);
  const { deviceType } = useDeviceType();

  const handleAdminScopeChange = (e?: React.ChangeEvent<HTMLInputElement>, chk?: boolean) => {
    if (e) {
      const isChecked = e.target.checked;
      setIsAdminChecked(true);
      setIsAdminPopupVisible(true);
    } else if (chk) {
      setIsAdminPopupVisible(false);
      setIsAdminChecked(true);
    } else {
      setIsAdminPopupVisible(false);
      setIsAdminChecked(false);
    }
  };

  const adminSection = useMemo(() => {
    if (name !== 'admin') return null;
    return (
      <>
        <SectionMessage
          message='Do not share tokens with the admin scope with unauthorized parties.'
          size='md'
          status='warning'
          className='mst'
        />
        <Modal
          isOpened={isAdminPopupVisible}
          primaryButtonLabel='Enable admin access'
          secondaryButtonLabel='Cancel'
          primaryButtonCallback={() => handleAdminScopeChange(undefined, true)}
          secondaryButtonCallback={() => handleAdminScopeChange(undefined, false)}
          isMobile={deviceType !== 'desktop'}
          showSecondaryButton
          shouldCloseOnSecondaryButtonClick
          showHandleBar
          disableCloseOnOverlay={false}
        >
          <div className='modal__icon' style={{ background: 'var(--core-color-solid-yellow-100)' }}>
            <StandaloneCircleExclamationRegularIcon fill='var(--icon-color)' iconSize='2xl' />
          </div>
          <div className='modal__content'>
            <Heading.H4>Are you sure you want to enable admin scope for your token?</Heading.H4>
            <Text>
              Granting admin access gives your token full control over your account and increases
              security risks. We recommend granting this level of access only when it&apos;s
              essential.
            </Text>
          </div>
        </Modal>
      </>
    );
  }, [name, isAdminPopupVisible, deviceType]);

  return (
    <div className={clsx(styles.api_token_card)} {...rest}>
      <CustomCheckbox
        name={name}
        id={`${name}-scope`}
        register={register(name)}
        onChange={handleAdminScopeChange}
      >
        <label data-testid={`card-label-${name}`} htmlFor={`${name}-scope`}>
          <Text size='md'>{label}</Text>
        </label>
      </CustomCheckbox>
      <Text>{description}</Text>
      {adminSection}
    </div>
  );
};

export default ApiTokenCard;
