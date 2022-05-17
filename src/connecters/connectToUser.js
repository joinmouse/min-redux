import { connect } from "../redux";

const userSelector = (state) => {
  return {
    user: state.user,
  };
};

const userDispatcher = (dispatch) => {
  return {
    updateUser: (attrs) => dispatch({ type: "updateUser", data: attrs }),
  };
};

export default connect(userSelector, userDispatcher);
