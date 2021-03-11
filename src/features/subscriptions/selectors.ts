import { arrayOfIds, followingFollowers } from "./types";

export const getSubscriptions = (state: any, id: number): followingFollowers => {
    return state.subscriptions[id];
};

export const getFollowers = (state: any, id: number): arrayOfIds | undefined => {
    if (state.subscriptions[id]) {
        return state.subscriptions[id].followers;
    }
};

export const getFollowings = (state: any, id: number): arrayOfIds | undefined => {
    if (state.subscriptions[id]) {
        return state.subscriptions[id].following;
    }
};
