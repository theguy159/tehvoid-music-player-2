import React, { useState } from "react";
import { useStore } from "../store-provider";
import { Modal, Button, Toggle, FlexboxGrid } from "rsuite";

import { setShowSettingsModal } from "../utils";
import "../css/SettingsModal.scss";

function closeModal(dispatch) {
  setShowSettingsModal(dispatch, false);
}

function SettingsModal(props) {
  const { state, dispatch } = useStore();
  const { showSettingsModal } = state;
  const [autoplayChecked, setAutoplayChecked] = useState(false);
  const [showTitleChecked, setShowTitleChecked] = useState(false);

  return (
    <Modal
      backdrop
      show={showSettingsModal}
      size="md"
      onHide={() => closeModal(dispatch)}
      className="settingsModal"
    >
      <Modal.Header>
        <Modal.Title>Tehvoid Music Player Settings</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h1>Hello there!</h1>
        <p>
          Here I will (obviously) add settings and toggles! <b>oh my!</b>
        </p>
        <p>PS: none of the settings listed below does anything yet</p>
        <br />
        <div className="toggles">
          <FlexboxGrid justify="space-between">
            <FlexboxGrid.Item colspan={12}>
              Autoplay at startup:
            </FlexboxGrid.Item>
            <FlexboxGrid.Item colspan={2}>
              <Toggle
                onChange={() => setAutoplayChecked(!autoplayChecked)}
                checked={autoplayChecked}
              />
            </FlexboxGrid.Item>
          </FlexboxGrid>

          <FlexboxGrid justify="space-between">
            <FlexboxGrid.Item colspan={12}>
              Show song title in statusbar:
            </FlexboxGrid.Item>
            <FlexboxGrid.Item colspan={2}>
              <Toggle
                onChange={() => setShowTitleChecked(!showTitleChecked)}
                checked={showTitleChecked}
              />
            </FlexboxGrid.Item>
          </FlexboxGrid>
        </div>
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
