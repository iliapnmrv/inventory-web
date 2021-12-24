const defaultState = {
    username: { id: 0, login: "guest", role: "guest" },
    isAuth: false,
};

export const userReducer = (state = defaultState, { type, payload }) => {
    switch (type) {
        case "CHANGE_USER_DATA":
            return {...state, username: payload };
        case "SET_IS_AUTHENTICATED":
            return {...state, isAuth: payload };
        default:
            return state;
    }
};