import {
  ACTION_USER_SET,
  ACTION_USER_SET_FIRSTNAME,
  ACTION_USER_SET_LASTNAME,
  ACTION_USER_SET_AGE,
  ACTION_USER_SET_GENDER,
  ACTION_USER_SET_ID_CARD,
  ACTION_USER_SET_PHONE_NUMBER,
  ACTION_USER_SET_INTRODUCE,
  ACTION_USER_SET_PROVINCE,
  ACTION_USER_SET_PHOTO_URL,
  ACTION_USER_SET_INTERESTED,
} from "../constants";

const initialState = {
  email: "boatkungth@gmail.com",
  photoURL:
    "https://firebasestorage.googleapis.com/v0/b/goodjob-273317.appspot.com/o/images%2FlT0ALPTSIaXqJSJ1fVewCx4mKa23?alt=media&token=87c3629f-3f4d-4fe4-8836-f955c8db21c2",
  firstname: "ขจร",
  lastname: "บุญเจริญ",
  age: 20,
  phone_number: "0831594504",
  id_card: "1234567890123",
  gender: "ชาย",
  introduce: "ฉันเก่ง",
  province: "กรุงเทพฯ ",
  interested: ["ผู้ดูแลรักษาความปลอดภัย", "สตาฟ"],
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case ACTION_USER_SET:
      return { ...state, email: payload };

    case ACTION_USER_SET_PHOTO_URL:
      return { ...state, photoURL: payload };

    case ACTION_USER_SET_FIRSTNAME:
      return { ...state, firstname: payload };

    case ACTION_USER_SET_LASTNAME:
      return { ...state, lastname: payload };

    case ACTION_USER_SET_AGE:
      return { ...state, age: payload };

    case ACTION_USER_SET_PHONE_NUMBER:
      return { ...state, phone_number: payload };

    case ACTION_USER_SET_ID_CARD:
      return { ...state, id_card: payload };

    case ACTION_USER_SET_GENDER:
      return { ...state, gender: payload };

    case ACTION_USER_SET_INTRODUCE:
      return { ...state, introduce: payload };

    case ACTION_USER_SET_PROVINCE:
      return { ...state, province: payload };

    case ACTION_USER_SET_INTERESTED:
      return { ...state, interested: payload };

    default:
      return state;
  }
};
