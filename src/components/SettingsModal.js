import React from "react";
import { useStore } from "../store-provider";
import {
  Modal,
  Button,
  IconButton,
  Icon,
  Toggle,
  SelectPicker,
  FlexboxGrid,
  Divider,
  FormGroup,
  RadioGroup,
  Radio,
} from "rsuite";
import themes from "../theme/themes.json";
import {
  setShowSettingsModal,
  setShowSongTitleInStatusBar,
  toggleCompact,
  setAutoplayAtStartup,
} from "../utils";
import "../css/SettingsModal.scss";

function closeModal(dispatch) {
  setShowSettingsModal(dispatch, false);
}

function SettingsModal(props) {
  const { state, dispatch } = useStore();
  const {
    showSettingsModal,
    showSongTitleInStatusBar,
    autoplayAtStartup,
  } = state;
  const { compact } = state.status;

  const rightColspan = 7;

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
        <div className="settingsDisclaimer">
          <h1>Hello there!</h1>
          <p>
            Here I will (obviously) add settings and toggles! <b>oh my!</b>
          </p>
          <p>PS: none of the settings listed below does anything yet</p>
        </div>
        <div className="settings">
          <Divider>General</Divider>
          <FlexboxGrid justify="space-between">
            <FlexboxGrid.Item colspan={12}>
              Autoplay at startup:
            </FlexboxGrid.Item>
            <FlexboxGrid.Item colspan={rightColspan}>
              <Toggle
                onChange={() =>
                  setAutoplayAtStartup(dispatch, !autoplayAtStartup)
                }
                checked={autoplayAtStartup}
              />
            </FlexboxGrid.Item>
          </FlexboxGrid>

          <FlexboxGrid justify="space-between">
            <FlexboxGrid.Item colspan={12}>
              Show song title in statusbar:
            </FlexboxGrid.Item>
            <FlexboxGrid.Item colspan={rightColspan}>
              <Toggle
                onChange={() =>
                  setShowSongTitleInStatusBar(
                    dispatch,
                    !showSongTitleInStatusBar
                  )
                }
                checked={showSongTitleInStatusBar}
              />
            </FlexboxGrid.Item>
          </FlexboxGrid>

          <FlexboxGrid justify="space-between">
            <FlexboxGrid.Item colspan={12}>Theme:</FlexboxGrid.Item>
            <FlexboxGrid.Item colspan={rightColspan}>
              <SelectPicker
                data={themes}
                searchable={false}
                cleanable={false}
                defaultValue="purpleDark"
              />
            </FlexboxGrid.Item>
          </FlexboxGrid>

          <FlexboxGrid justify="space-between">
            <FlexboxGrid.Item colspan={12}>Item display mode:</FlexboxGrid.Item>
            <FlexboxGrid.Item colspan={rightColspan}>
              <FormGroup controlId="itemDisplayMode">
                <RadioGroup
                  name="itemDisplayMode"
                  inline
                  value={compact ? "compact" : "expanded"}
                  onChange={() => toggleCompact(state, dispatch)}
                >
                  <Radio value="compact">Compact</Radio>
                  <Radio value="expanded">Expanded</Radio>
                </RadioGroup>
              </FormGroup>
            </FlexboxGrid.Item>
          </FlexboxGrid>

          <Divider>Other</Divider>

          <FlexboxGrid justify="space-between">
            <FlexboxGrid.Item colspan={12} />
            <FlexboxGrid.Item colspan={rightColspan}>
              <IconButton
                icon={<Icon icon="upload" />}
                block
                style={{ filter: "brightness(120%)" }}
              >
                Export settings
              </IconButton>
            </FlexboxGrid.Item>
          </FlexboxGrid>

          <FlexboxGrid justify="space-between">
            <FlexboxGrid.Item colspan={12} />
            <FlexboxGrid.Item colspan={rightColspan}>
              <IconButton
                icon={<Icon icon="download" />}
                block
                style={{ filter: "brightness(120%)" }}
              >
                Import settings
              </IconButton>
            </FlexboxGrid.Item>
          </FlexboxGrid>

          <FlexboxGrid justify="space-between">
            <FlexboxGrid.Item colspan={12} />
            <FlexboxGrid.Item colspan={rightColspan}>
              <IconButton
                icon={<Icon icon="trash" />}
                color="red"
                block
                style={{ filter: "brightness(80%) saturate(92%)" }}
              >
                Reset all settings
              </IconButton>
            </FlexboxGrid.Item>
          </FlexboxGrid>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button
          onClick={() => closeModal(dispatch)}
          style={{ filter: "brightness(120%)" }}
        >
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default SettingsModal;
