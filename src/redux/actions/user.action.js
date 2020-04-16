import {
  ACTION_USER_SET,
  ACTION_USER_SET_FIRSTNAME,
  ACTION_USER_SET_LASTNAME,
  ACTION_USER_SET_AGE,
  ACTION_USER_SET_PHONE_NUMBER,
  ACTION_USER_SET_ID_CARD,
  ACTION_USER_SET_GENDER,
  ACTION_USER_SET_INTRODUCE,
  ACTION_USER_SET_PROVINCE,
  ACTION_USER_SET_INTERESTED,
  ACTION_USER_SET_PHOTO_URL,
} from "../constants";

export const setUser = (payload) => ({
  type: ACTION_USER_SET,
  payload,
});

export const setFirstname = (payload) => ({
  type: ACTION_USER_SET_FIRSTNAME,
  payload,
});

export const setLastname = (payload) => ({
  type: ACTION_USER_SET_LASTNAME,
  payload,
});
export const setAge = (payload) => ({
  type: ACTION_USER_SET_AGE,
  payload,
});
export const setPhoneNumber = (payload) => ({
  type: ACTION_USER_SET_PHONE_NUMBER,
  payload,
});
export const setIDcard = (payload) => ({
  type: ACTION_USER_SET_ID_CARD,
  payload,
});
export const setGenger = (payload) => ({
  type: ACTION_USER_SET_GENDER,
  payload,
});
export const setIntroduce = (payload) => ({
  type: ACTION_USER_SET_INTRODUCE,
  payload,
});
export const setProvince = (payload) => ({
  type: ACTION_USER_SET_PROVINCE,
  payload,
});
export const setInterested = (payload) => ({
  type: ACTION_USER_SET_INTERESTED,
  payload,
});
export const setPhotoURL = (payload) => ({
  type: ACTION_USER_SET_PHOTO_URL,
  payload,
});
