import { IInitialState, IAction } from '../models/initialState.model';
import { IAvailableRecipient } from '../models/recipients.model';
import { DispatchTypeEnum } from '../types/dispatch.type';

export const initialState: IInitialState = {
  availableRecipients: [],
};

function reducer(state: IInitialState, action: IAction) {
	switch (action.type) {
		case DispatchTypeEnum.SET_AVAILABLE_RECIPIENTS: {
			return {
				...state,
				availableRecipients: action.payload.data.sort((a, b) => b.data.length - a.data.length) as IAvailableRecipient[],
			};
		}

		case DispatchTypeEnum.CHANGE_EMAIL_SELECTION: {
			return {
				...state,
				availableRecipients: action.payload.data.sort((a, b) => b.data.length - a.data.length) as IAvailableRecipient[],
			};
		}

		case DispatchTypeEnum.ADD_RECIPIENT: {
			return {
				...state,
				availableRecipients: action.payload.data.sort((a, b) => b.data.length - a.data.length) as IAvailableRecipient[],
			};
		}

		case DispatchTypeEnum.REMOVE_RECIPIENT: {
			return {
				...state,
			}
		}

		default:
			return state;
	}
};

export default reducer;
