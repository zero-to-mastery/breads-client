import { ADD_MODAL, REMOVE_MODAL } from "../actionTypes";
import { ModalReading, ModalTags, ModalActionTypes } from "./types";
import alerts from "../alerts";
import { AppDispatch } from "../../app/store";

const { removeAlert, addAlert } = alerts.actions;

const addModal = (
  reading_id: ModalReading,
  tag_names: ModalTags
): ModalActionTypes => ({
  type: ADD_MODAL,
  payload: {
    reading_id,
    tag_names,
  },
});

const removeModal = (): ModalActionTypes => ({
  type: REMOVE_MODAL,
  payload: {
    reading_id: "",
    tag_names: [],
  },
});

export const addModalAlert =
  (modal: any, reading_id: ModalReading, tag_names: ModalTags) =>
  (dispatch: AppDispatch): void => {
    dispatch(addAlert({ message: modal, type: "info" }));
    dispatch(addModal(reading_id, tag_names));
  };

export const removeModalAlert =
  () =>
  (dispatch: AppDispatch): void => {
    dispatch(removeAlert());
    dispatch(removeModal());
  };
