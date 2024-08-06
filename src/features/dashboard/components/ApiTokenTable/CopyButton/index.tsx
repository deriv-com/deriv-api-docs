import React, { useState } from 'react';
import CopyTokenDialog from '../CopyTokenDialog';
import styles from '../token-cell.module.scss';

type TCopyButton = {
  value: string;
  has_admin?: boolean;
};

const CopyButton = ({ value, has_admin = false }: TCopyButton) => {
  const [toggle_modal, setToggleModal] = useState(false);
  const [is_copying_token, setIsCopyingToken] = useState(false);
  const is_copying = is_copying_token ? styles.is_copying : '';

  const copiedToken = () => {
    if (!is_copying_token) {
      setIsCopyingToken(true);
      setTimeout(() => {
        setIsCopyingToken(false);
      }, 2000);
    }
  };

  const copyToken = () => {
    navigator.clipboard.writeText(value);
    copiedToken();
  };

  return (
    <React.Fragment>
      <button
        onClick={() => {
          has_admin ? setToggleModal(!toggle_modal) : copyToken();
        }}
        className={`${styles.copy_button} ${is_copying}`}
      />
      {toggle_modal && <CopyTokenDialog setToggleModal={setToggleModal} copyToken={copyToken} />}
    </React.Fragment>
  );
};

export default CopyButton;
