import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import { LOAD_SUBSCRIPTIONS, ADD_SUBSCRIPTION, REMOVE_SUBSCRIPTIONS } from "../actionTypes";
import { RootState } from "../rootReducer";

export type SubscriptionState = any;

interface LoadSubscriptionAction {
    type: typeof LOAD_SUBSCRIPTIONS;
    users: any;
    id: number;
    user_id: never;
}

interface AddSubscriptionAction {
    type: typeof ADD_SUBSCRIPTION;
    id: number;
    user_id: number | null;
    users: never;
}

interface RemoveSubscriptionAction {
    type: typeof REMOVE_SUBSCRIPTIONS;
    id: number;
    user_id: number | null;
    users: never;
}

export type fetchingSubscriptions = ThunkAction<Promise<any>, RootState, unknown, Action>;
export type removingSubscription = ThunkAction<Promise<any>, RootState, unknown, Action>;
export type postingNewSubscription = ThunkAction<Promise<any>, RootState, unknown, Action>;
export type fetchingSubscriptionsIfNeeded = ThunkAction<Promise<any> | undefined, RootState, unknown, Action>;

export type SubscriptionActionTypes = LoadSubscriptionAction | AddSubscriptionAction | RemoveSubscriptionAction;

export type arrayOfIds = number[];

export interface followingFollowers {
    following: arrayOfIds;
    followers: arrayOfIds;
}
