import { PayloadAction } from "@reduxjs/toolkit";

interface IUser {
    payload: {
        id: number;
        email: string;
        name: string;
        iat: number;
        exp: number;
        //   dev: false | true // Have I add it? It's developer options from settings.
    } | null;
}

const defaultValue = {
    user: null,
};

export const user = (state = defaultValue, action: PayloadAction & IUser) => {
    switch (action.type) {
        case "setUser":
            return { ...state, user: action.payload };
        default:
            return state;
    }
};
