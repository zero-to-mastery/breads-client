import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

type IProps = {
  open: boolean;
  handleClick: () => void;
};

const FloatingButton: React.FunctionComponent<IProps> = ({ open, handleClick }) => {
  return (
    <>
      <button className="floating-button" onClick={handleClick}>
        <FontAwesomeIcon icon={open ? 'plus' : 'minus'} />
      </button>
    </>
  );
};

export default FloatingButton;
