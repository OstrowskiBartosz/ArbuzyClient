import { createSlice, current } from '@reduxjs/toolkit';

const initialState = {
  newAlert: {
    alertHeading: '',
    alertText: '',
    alertColor: '',
    alertNumber: 0
  },
  messageAlerts: [],
  alertNumber: 1
};

const messageAlertsSlice = createSlice({
  name: 'messageAlerts',
  initialState,
  reducers: {
    newAlert: (state, action) => {
      state.newAlert = {
        alertHeading: action.payload.alertHeading,
        alertText: action.payload.alertText,
        alertColor: action.payload.alertColor,
        alertNumber: state.alertNumber
      };
      state.alertNumber = state.alertNumber + 1;
    },
    addOngoingAlerts: (state, action) => {
      state.messageAlerts = [
        ...state.messageAlerts,
        {
          alertHeading: action.payload.alertHeading,
          alertText: action.payload.alertText,
          alertColor: action.payload.alertColor,
          alertNumber: action.payload.alertNumber,
          alertTimeOut: action.payload.alertTimeOut
        }
      ];
      state.newAlert = {
        alertHeading: '',
        alertText: '',
        alertColor: '',
        alertNumber: 0
      };
    },
    mouseOverOngoingAlert: (state, action) => {
      state.messageAlerts.map((messageAlert, index) =>
        index === action.payload.alertIndex ? { ...messageAlert, alertTimeOut: '' } : messageAlert
      );
    },
    mouseOutOngoingAlert: (state, action) => {
      const { alertIndex, newTimeoutHandler } = action.payload;
      const newArray = [...state.messageAlerts];
      let messageAlert = { ...current(state.messageAlerts[alertIndex]) };
      messageAlert.alertTimeOut = newTimeoutHandler;
      newArray.splice(alertIndex, 1);
      newArray.splice(alertIndex, 0, messageAlert);
      state.messageAlerts = [...newArray];
    },
    removeOngoingAlert(state, action) {
      const newArray = [...state.messageAlerts];
      newArray.splice(action.payload, 1);
      state.messageAlerts = [...newArray];
    }
  }
});

export const {
  newAlert,
  addOngoingAlerts,
  removeOngoingAlert,
  mouseOverOngoingAlert,
  mouseOutOngoingAlert
} = messageAlertsSlice.actions;

export default messageAlertsSlice.reducer;
