import { RECEIVE_ENTITIES } from "./actionTypes";

export interface Users {
  id: number;
  username: string;
  image: string;
}

export interface Readings {
  id: number;
  title: string;
  domain: string;
  description: string;
  reading_image: string;
  word_count: number;
  url: string;
  created_at: string;
  favorite: number;
  reader: number;
  tags: string[] | null;
}

export interface Tags {
  [k: string]: {
    id: number;
    tag_name: string;
    date: string;
    count: number;
  };
}

export interface Entities {
  user?: Users;
  readings?: Readings;
  tags?: Tags;
}

export interface ReceiveEntitiesAction {
  type: typeof RECEIVE_ENTITIES;
  payload: {
    entities: Entities;
  };
  list: any;
  id?: any;
}

export const receiveEntities = (
  entities: any,
  list?: any,
  id?: any
): ReceiveEntitiesAction => ({
  type: RECEIVE_ENTITIES,
  payload: entities,
  list,
  id,
});
