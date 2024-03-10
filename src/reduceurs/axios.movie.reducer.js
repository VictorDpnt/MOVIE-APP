import { SET_STABLE_STATE } from "../actions/axios.movie.action";

const initialeState = { showStable: {} };

export default function stableReducer(state = initialeState, action) {
  switch (action.type) {
    case SET_STABLE_STATE:
      return [action.payload, ...state];
    default:
      return state;
  }
}
