import React from "react";
import { useStore } from "../store-provider";
import { Modal, Button } from "rsuite";

import { setShowSettingsModal } from "../utils";

function closeModal(dispatch) {
  setShowSettingsModal(dispatch, false);
}

function SettingsModal(props) {
  const { state, dispatch } = useStore();
  const { showSettingsModal } = state;

  return (
    <Modal
      backdrop
      show={showSettingsModal}
      full
      onHide={() => closeModal(dispatch)}
    >
      <Modal.Header>
        <Modal.Title>Tehvoid Music Player Settings</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h1>Hello there!</h1>
        <p>
          Here I will (obviously) add settings and toggles! <b>oh my!</b>
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button appearance="primary" onClick={() => closeModal(dispatch)}>
          OK
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default SettingsModal;
