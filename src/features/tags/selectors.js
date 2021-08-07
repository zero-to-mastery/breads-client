import { NAME } from "./constants";

// does created_at get updated whenever a row is updated in mysql?
export const getMostRecentTags = (state, list) => {
  // give time for tags to load
  if (state.tagsByList[`${list}`] && state.tagsByList[`${list}`].items) {
    let tagsArray = state.tagsByList[`${list}`].items.map(
      (id) => state[NAME][id]
    );

    let tags = tagsArray
      .sort((a, b) => a.date > b.date)
      .map((tag) => state[NAME][tag.id].id)
      .reverse()
      .slice(0, 10);

    return tags;
  }
};

export const getTopTags = (state, list) => {
  // give time for tags to load
  if (state.tagsByList[`${list}`] && state.tagsByList[`${list}`].items) {
    let tagsArray = state.tagsByList[`${list}`].items.map(
      (id) => state[NAME][id]
    );

    let tags = tagsArray
      .sort((a, b) => b.count - a.count)
      .map((tag) => state[NAME][tag.id].id)
      .slice(0, 10);

    return tags;
  }
};

export const getTagById = (state, id) => {
  if (state && state[NAME]) {
    return state[NAME][id];
  }
};

export const getUserMostRecentTags = (state, user_id) => {
  // give time for tags to load
  if (state && state[NAME]) {
    let tags = Object.values(state[NAME])
      .filter((tag) => tag.user_id.includes(user_id))
      .sort((a, b) => a.date > b.date)
      .map((tag) => state[NAME][tag.id].id)
      .reverse()
      .slice(0, 10);
    return tags;
  }
};

export const getUserTopTags = (state, user_id) => {
  if (state[NAME]) {
    let tags = Object.values(state[NAME])
      .filter((tag) => tag.user_id.includes(user_id))
      .sort((a, b) => b.count - a.count)
      .map((tag) => state[NAME][tag.id].id)
      .slice(0, 10);
    return tags;
  }
};
