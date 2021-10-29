import { NAME } from "./constants";
import { Tag } from "./types";

// does created_at get updated whenever a row is updated in mysql?
export const getMostRecentTags = (
  state: any,
  list: string
): Tag[] | undefined => {
  // give time for tags to load
  if (state.tagsByList[`${list}`] && state.tagsByList[`${list}`].items) {
    let tagsArray = state.tagsByList[`${list}`].items.map(
      (id: number) => state[NAME][id]
    );

    let tags = tagsArray
      .sort((a: Tag, b: Tag) => {
        if (a.date > b.date) return 1;
        else return -1;
      })
      .map((tag: Tag) => state[NAME][tag.id].id)
      .reverse()
      .slice(0, 10);

    return tags;
  }
};

export const getTopTags = (state: any, list: string): Tag[] | undefined => {
  // give time for tags to load
  if (state.tagsByList[`${list}`] && state.tagsByList[`${list}`].items) {
    let tagsArray = state.tagsByList[`${list}`].items.map(
      (id: number) => state[NAME][id]
    );

    let tags = tagsArray
      .sort((a: Tag, b: Tag) => b.count - a.count)
      .map((tag: Tag) => state[NAME][tag.id].id)
      .slice(0, 10);

    return tags;
  }
};

export const getTagById = (state: any, id: number): Tag => {
  return state[NAME][id];
};

export const getUserMostRecentTags = (
  state: any,
  user_id: string
): Tag[] | undefined => {
  // give time for tags to load
  if (state && state[NAME]) {
    let tags = Object.values<Tag>(state[NAME])
      .filter((tag) => tag.user_id.includes(user_id))
      .sort((a, b) => {
        if (a.date > b.date) return 1;
        else return -1;
      })
      .map((tag: Tag) => state[NAME][tag.id].id);
    // .reverse()
    // .slice(0, 10);
    return tags;
  }
};

export const getUserTopTags = (
  state: any,
  user_id: string
): Tag[] | undefined => {
  if (state[NAME]) {
    let tags = Object.values<Tag>(state[NAME])
      .filter((tag) => tag.user_id.includes(user_id))
      .sort((a, b) => b.count - a.count)
      .map((tag) => state[NAME][tag.id].id)
      .slice(0, 10);
    return tags;
  }
};
