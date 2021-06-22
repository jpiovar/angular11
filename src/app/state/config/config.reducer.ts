import { ConfigState } from './config.models';
import * as ConfigActions from './config.actions';

export const intitalState: ConfigState = {
  data: null,
  loading: false,
  error: null
};

export function reducer(state = intitalState, action: ConfigActions.Actions): ConfigState {
  switch (action.type) {
    case ConfigActions.CONFIG_LOAD: {

      return {
        ...state,
        loading: true,
        error: null
      };
    }

    case ConfigActions.CONFIG_LOAD_FROM_LOCAL: {

      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };
    }

    case ConfigActions.CONFIG_LOAD_SUCCESS: {

      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null
      };
    }

    case ConfigActions.CONFIG_LOAD_FAIL: {
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    }

    default: {
      return state;
    }
  }
}
