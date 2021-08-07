import { ReadingActionTypes } from "../globalReadings/types";

export type ReadingListType = {
  upToDate: boolean;
  items: number[];
};

export type ReadingListState = {
  [k: string]: ReadingListType;
};

export type ReadingListActionTypes = ReadingActionTypes | any;

export type PromiseReturnTypes = ReadingListActionTypes | void;
