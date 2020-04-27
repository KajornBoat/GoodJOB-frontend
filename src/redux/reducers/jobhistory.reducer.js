import { ACTION_JOB_HISTORY_SET } from "../constants";
const initialState = {
  data: [
    {
      id: 0,
      title: "รับสมัคร Staff และช่างภาพประจำบูธ",
      name: "วัชรินทร์ กัณหา",
      url: "https://drive.google.com/uc?id=1p8k9H12KQJBQ2qL9ZbevrPd8cSteCeC6",
      start_date: new Date("2020-04-12T06:37:00.000Z"),
      finish_date: new Date("2020-04-12T11:37:00.000Z"),
      location: [13.753583764497517, 100.50070613622665],
      place: "ประเทศไทย",
      description: String.raw`Staff
- ประจำจุดลงทะเบียน จุดเล่นเกม จุดแจกของราลวัล
- อายุ 15 ปีขึ้นไป
- เพศชายก็ได้หญิงก็ดี
ช่างภาพ
- ถ่ายบรรยากาศภายในงาน

สวัสดิการ:
อาหารกลางวันและเย็นฟรี`,
      position: ["ช่างภาพ", "สตาฟ"],
      posWage: [1000, 500],
      myPosition: "ช่างภาพ",
    },
  ],
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case ACTION_JOB_HISTORY_SET:
      return { ...state, data: payload };
    default:
      return state;
  }
};
