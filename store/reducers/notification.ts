import { PayloadAction } from "@reduxjs/toolkit";
import { INotification } from "types/Notification";

interface IPayload {
    payload: INotification[] | null
}

const defaultValue = {
    notification: null
};

export const notification = (state=defaultValue, action: PayloadAction & IPayload) => {
    switch(action.type) {
    case "setNotification":
        return { ...state, notification: action.payload};
    default:
        return state;
    }
};