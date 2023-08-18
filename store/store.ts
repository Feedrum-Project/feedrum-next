import { createStore } from "@reduxjs/toolkit";
import { reducer } from "./reducers/reducer";
import { IUser } from "types/User";
import { INotification } from "types/Notification";

const store = createStore(reducer);

export interface IStore {
    user: { user: IUser | null };
    notification: {
        notification: INotification[] | [];
    };
}

export default store;
