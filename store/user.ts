import { createStore, PayloadAction } from "@reduxjs/toolkit";

interface IUser {
    payload: {
      id: number;
      email: string;
      name: string;
      iat: number;
      exp: number;
    };
}

const defaultValue = {
    user: {
        id: -1,
        email: "null",
        name: "null",
        iat: -1,
        exp: -1
    }
};

const reducer = (state=defaultValue, action: PayloadAction & IUser) => {
    switch(action.type) {
    case "set":
        return { ...state, user: action.payload};
    default:
        return state;
    }
};

const store = createStore(reducer);

export default store;