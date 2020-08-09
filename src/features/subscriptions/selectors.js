export const getSubscriptions = (state, id) => {
    return state.subscriptions[id];
}

export const getFollowers = (state, id) => {
    if (state.subscriptions[id]) {
        return state.subscriptions[id].followers;
    }
}

export const getFollowings = (state, id) => {
    if (state.subscriptions[id]) {
        return state.subscriptions[id].following;
    }
}