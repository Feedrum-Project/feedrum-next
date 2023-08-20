import { PayloadAction } from "@reduxjs/toolkit";
import { INotification } from "types/Notification";

interface IPayload {
    payload: INotification[] | null;
}

interface IState {
    notification: null | INotification[];
}

const defaultValue: IState = {
    notification: null,
};

export const notification = (
    state = defaultValue,
    action: PayloadAction & IPayload
) => {
    switch (action.type) {
    case "setNotification": {
        return { ...state, notification: action.payload };
    }
    case "addNotification": {
        const {
            type,
            title,
            text,
        }: { type: "bad" | "good"; title: string; text: string } =
            action.payload!;
        const id =
            state.notification === null ? 0 : state.notification.length;
        const value =
            state.notification === null ? [] : [...state.notification];
        const createdAt = Date.now();

        return {
            ...state,
            notification:
                value === null
                    ? [action.payload]
                    : [...value, { id, type, title, text, createdAt }],
        };
    }
    case "removeNotification": {
        if (state.notification === null) return;

        const id =
            state.notification?.length == 0
                ? 0
                : state.notification.length - 1;
        const notification = state.notification?.filter((e) => {
            return e.id !== id;
        });
        return {
            ...state,
            notification,
        };
    }

    default:
        return state;
    }
};
