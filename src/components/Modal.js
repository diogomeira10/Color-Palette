import React, { useEffect } from 'react';
import Modal from 'react-modal';

const CustomModal = ({ isOpen, closeModal, content }) => {
  const customStyles = {
    content: {
        width: '6%',
        height: '10%',
        top: '50%',
        left: '50%',
        transform: 'translateX(-50%)',
        display: "block",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "grey",
        color: "white",
        justifyContent: "center",
        'border-radius': "1em",
        'font-weight': "bold",
    },
  };

  useEffect(() => {
    let timeout;
    if (isOpen) {
      // Set a timeout to close the modal after 1000 milliseconds (1 second)
      timeout = setTimeout(() => {
        closeModal();
      }, 1000);
    }

    // Clean up the timeout on component unmount or when isOpen changes
    return () => clearTimeout(timeout);
  }, [isOpen, closeModal]);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      ariaHideApp={false}
      style={customStyles}
    >
      <div className='modal'>
        <div>{content}</div>
      </div>
    </Modal>
  );
};

export default CustomModal;
