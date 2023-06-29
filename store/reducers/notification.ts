import { PayloadAction } from "@reduxjs/toolkit";
import { INotification } from "types/Notification";

interface IPayload {
    payload: INotification[] | null
}

interface IState {
    notification: null | INotification[]
}

const defaultValue: IState = {
    notification: null
};

export const notification = (state=defaultValue, action: PayloadAction & IPayload) => {
    switch(action.type) {
    case "setNotification": {
        return { ...state, notification: action.payload};
    }
    case "addNotification": {
        const {type, title, text} = action.payload!;
        const id = state.notification === null ? 0 : state.notification.length;
        const value = state.notification === null ? [] : [...state.notification];
        const createdAt = Date.now();
        
        return {
            ...state,
            notification: value === null ? [action.payload] : [...value, {id, type, title, text, createdAt}]};
    }
    case "removeNotification": {
        const id = state.notification === null ? 0 : state.notification.length;

        return {
            ...state,
            notification: state.notification?.filter(e => {
                e.id !== id;
            })
        };
    }

    default:
        return state;
    }
};