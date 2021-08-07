import { ADD_LOADER, REMOVE_LOADER } from "../actionTypes";

export interface LoaderState {
  isLoading: boolean;
  id: any[];
}

interface AddLoaderAction {
  type: typeof ADD_LOADER;
  id: any;
}

interface RemoveLoaderAction {
  type: typeof REMOVE_LOADER;
  id: any;
}

export type LoaderActionTypes = AddLoaderAction | RemoveLoaderAction;
