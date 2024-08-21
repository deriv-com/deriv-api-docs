import React, { useState, useCallback } from 'react';
import { Text, Heading, Modal, SectionMessage } from '@deriv-com/quill-ui';
import { StandaloneCircleExclamationRegularIcon } from '@deriv/quill-icons';
import { TApiTokenForm, TApiTokenFormItemsNames } from '../ApiTokenForm/api-token.form';
import { UseFormRegister } from 'react-hook-form';
import CustomCheckbox from '@site/src/components/CustomCheckbox';
import clsx from 'clsx';
import styles from './api-token.card.module.scss';
import useDeviceType from '@site/src/hooks/useDeviceType';
import useDisableScroll from '../../hooks/useDisableScroll';

interface IApiTokenCardProps {
  register: UseFormRegister<TApiTokenForm>;
  name: TApiTokenFormItemsNames;
  label: string;
  description: string;
}

const ApiTokenCard = ({ register, name, label, description }: IApiTokenCardProps) => {
  const [isAdminChecked, setIsAdminChecked] = useState(false);
  const [isAdminPopupVisible, setIsAdminPopupVisible] = useState(false);
  const { deviceType } = useDeviceType();

  useDisableScroll(isAdminPopupVisible);

  const handlePopupCancel = () => {
    setIsAdminPopupVisible(false);
    setIsAdminChecked(false);
  };

  const handlePopupConfirm = () => {
    setIsAdminPopupVisible(false);
    setIsAdminChecked(true);
  };

  return (
    <div className={clsx(styles.api_token_card)}>
      <CustomCheckbox
        name={name}
        id={`${name}-scope`}
        checked={isAdminChecked}
        register={{
          ...register(name),
        }}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setIsAdminChecked(e.target.checked);
          if (e.target.checked) {
            setIsAdminPopupVisible(true);
          } else {
            setIsAdminPopupVisible(false);
            setIsAdminChecked(false);
          }
        }}
      >
        <label data-testid={`card-label-${name}`} htmlFor={`${name}-scope`}>
          <Text size='md'>{label}</Text>
        </label>
      </CustomCheckbox>
      <Text>{description}</Text>
      {name === 'admin' && (
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
            primaryButtonCallback={handlePopupConfirm}
            secondaryButtonCallback={handlePopupCancel}
            isMobile={deviceType !== 'desktop'}
            showSecondaryButton
            showPrimaryButton
            shouldCloseOnSecondaryButtonClick
            className='admin-scope-modal'
            showHandleBar
            disableCloseOnOverlay={true}
          >
            <div className='adminScopePopup__icons'>
              <StandaloneCircleExclamationRegularIcon fill='var(--icon-color)' iconSize='2xl' />
            </div>
            <div className='adminScopePopup__content'>
              <Heading.H4>Are you sure you want to enable admin scope for your token?</Heading.H4>
              <Text>
                Granting admin access gives your token full control over your account and increases
                security risks. We recommend granting this level of access only when it&apos;s
                essential.
              </Text>
            </div>
          </Modal>
        </>
      )}
    </div>
  );
};

export default ApiTokenCard;
