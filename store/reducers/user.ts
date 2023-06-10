import { PayloadAction } from "@reduxjs/toolkit";

interface IUser {
    payload: {
      id: number
      email: string
      name: string
      iat: number
      exp: number
    } | null
}

const defaultValue = {
    user: null
};

export const user = (state=defaultValue, action: PayloadAction & IUser) => {
    switch(action.type) {
    case "setUser":
        return { ...state, user: action.payload};
    default:
        return state;
    }
};