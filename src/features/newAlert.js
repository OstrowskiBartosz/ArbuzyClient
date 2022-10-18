import store from '../store/store';
import { newAlert } from '../store/storeSlices/messageAlertsSlice';

const addNewMessage = (color, title, text) => {
  store.dispatch(
    newAlert({
      alertColor: color,
      alertHeading: title,
      alertText: text
    })
  );
};

export default addNewMessage;
