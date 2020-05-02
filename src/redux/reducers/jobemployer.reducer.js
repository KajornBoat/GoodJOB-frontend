import { ACTION_JOB_EMPLOYER_SET } from "../constants";
const employeeImage =
  "https://drive.google.com/uc?id=10KxXNBYgwiTGCmYdl-h3rUpn_7isA0rT";
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
      posReq: [3, 2],
      posHave: [2, 2],
      comment: [
        {
          id: 0,
          url:
            "https://drive.google.com/uc?id=10KxXNBYgwiTGCmYdl-h3rUpn_7isA0rT",
          commenter: "Jimmy",
          content: "asdasd",
          replyer: "has",
          reply: "asddas",
        },
        {
          id: 1,
          url:
            "https://drive.google.com/uc?id=10KxXNBYgwiTGCmYdl-h3rUpn_7isA0rT",
          commenter: "Jimmy2",
          content: "awed",
        },
      ],
      mode: "Auto",
      myEmployee: [
        {
          id: 0,
          firstName: "วัชรินทร์",
          lastName: "กัณหา",
          gender: "ชาย",
          age: 23,
          introduceText: "...\n...\n...\n...",
          experience: [
            {
              work: "รับสมัคร staff งานเลี้ยงบริษัทแมวเหมียว ",
              position: "สตาฟ",
            },
            { work: "work11234", position: "รักษาความปลอดภัย" },
            { work: "work11234", position: "พนักงานต้อนรับ" },
            { work: "work11234", position: "บริกร" },
            { work: "work11234", position: "ช่างภาพ" },
          ],
          image: employeeImage,
          position: "ช่างภาพ",
        },
        {
          id: 1,
          firstName: "สิรินยา",
          lastName: "กำยาน",
          gender: "หญิง",
          age: 24,
          introduceText: "...\n...\n...\n...",
          experience: [
            {
              work: "รับสมัคร staff งานเลี้ยงบริษัทแมวเหมียว ",
              position: "สตาฟ",
            },
            { work: "work11234", position: "รักษาความปลอดภัย" },
            { work: "work11234", position: "พนักงานต้อนรับ" },
            { work: "work11234", position: "บริกร" },
            { work: "work11234", position: "ช่างภาพ" },
          ],
          image: employeeImage,
          position: "ช่างภาพ",
        },
        {
          id: 2,
          firstName: "นราวิชญ์",
          lastName: "ไตรพรม",
          gender: "ชาย",
          age: 25,
          introduceText: "...\n...\n...\n...",
          experience: [
            {
              work: "รับสมัคร staff งานเลี้ยงบริษัทแมวเหมียว ",
              position: "สตาฟ",
            },
            { work: "work11234", position: "รักษาความปลอดภัย" },
            { work: "work11234", position: "พนักงานต้อนรับ" },
            { work: "work11234", position: "บริกร" },
            { work: "work11234", position: "ช่างภาพ" },
          ],
          image: employeeImage,
          position: "สตาฟ",
        },
      ],
      inviteEmployee: [
        {
          id: 0,
          firstName: "กล้าณรงค์",
          lastName: "ทมโคตร",
          gender: "ชาย",
          age: 20,
          introduceText: "...\n...\n...\n...",
          experience: [
            {
              work: "รับสมัคร staff งานเลี้ยงบริษัทแมวเหมียว ",
              position: "สตาฟ",
            },
            { work: "work11234", position: "รักษาความปลอดภัย" },
            { work: "work11234", position: "พนักงานต้อนรับ" },
            { work: "work11234", position: "บริกร" },
            { work: "work11234", position: "ช่างภาพ" },
          ],
          image: employeeImage,
          position: "สตาฟ",
        },
        {
          id: 1,
          firstName: "ขจร",
          lastName: "บุญเจริญ",
          gender: "ชาย",
          age: 21,
          introduceText: "...\n...\n...\n...",
          experience: [
            {
              work: "รับสมัคร staff งานเลี้ยงบริษัทแมวเหมียว ",
              position: "สตาฟ",
            },
            { work: "work11234", position: "รักษาความปลอดภัย" },
            { work: "work11234", position: "พนักงานต้อนรับ" },
            { work: "work11234", position: "บริกร" },
            { work: "work11234", position: "ช่างภาพ" },
          ],
          image: employeeImage,
          position: "ช่างภาพ",
        },
        {
          id: 2,
          firstName: "รวิสรา",
          lastName: "หนูเพ็ง",
          gender: "หญิง",
          age: 22,
          introduceText: "...\n...\n...\n...",
          experience: [
            {
              work: "รับสมัคร staff งานเลี้ยงบริษัทแมวเหมียว ",
              position: "สตาฟ",
            },
            { work: "work11234", position: "รักษาความปลอดภัย" },
            { work: "work11234", position: "พนักงานต้อนรับ" },
            { work: "work11234", position: "บริกร" },
            { work: "work11234", position: "ช่างภาพ" },
          ],
          image: employeeImage,
          position: "ช่างภาพ",
        },
        {
          id: 3,
          firstName: "วัชรินทร์",
          lastName: "กัณหา",
          gender: "ชาย",
          age: 23,
          introduceText: "...\n...\n...\n...",
          experience: [
            {
              work: "รับสมัคร staff งานเลี้ยงบริษัทแมวเหมียว ",
              position: "สตาฟ",
            },
            { work: "work11234", position: "รักษาความปลอดภัย" },
            { work: "work11234", position: "พนักงานต้อนรับ" },
            { work: "work11234", position: "บริกร" },
            { work: "work11234", position: "ช่างภาพ" },
          ],
          image: employeeImage,
          position: "บริกร",
        },
        {
          id: 4,
          firstName: "สิรินยา",
          lastName: "กำยาน",
          gender: "หญิง",
          age: 24,
          introduceText: "...\n...\n...\n...",
          experience: [
            {
              work: "รับสมัคร staff งานเลี้ยงบริษัทแมวเหมียว ",
              position: "สตาฟ",
            },
            { work: "work11234", position: "รักษาความปลอดภัย" },
            { work: "work11234", position: "พนักงานต้อนรับ" },
            { work: "work11234", position: "บริกร" },
            { work: "work11234", position: "ช่างภาพ" },
          ],
          image: employeeImage,
          position: "ช่างภาพ",
        },
        {
          id: 5,
          firstName: "นราวิชญ์",
          lastName: "ไตรพรม",
          gender: "ชาย",
          age: 25,
          introduceText: "...\n...\n...\n...",
          experience: [
            {
              work: "รับสมัคร staff งานเลี้ยงบริษัทแมวเหมียว ",
              position: "สตาฟ",
            },
            { work: "work11234", position: "รักษาความปลอดภัย" },
            { work: "work11234", position: "พนักงานต้อนรับ" },
            { work: "work11234", position: "บริกร" },
            { work: "work11234", position: "ช่างภาพ" },
          ],
          image: employeeImage,
          position: "บริกร",
        },
        {
          id: 6,
          firstName: "สมหญิง",
          lastName: "7",
          gender: "หญิง",
          age: 26,
          introduceText: "...\n...\n...\n...",
          experience: [
            {
              work: "รับสมัคร staff งานเลี้ยงบริษัทแมวเหมียว ",
              position: "สตาฟ",
            },
            { work: "work11234", position: "รักษาความปลอดภัย" },
            { work: "work11234", position: "พนักงานต้อนรับ" },
            { work: "work11234", position: "บริกร" },
            { work: "work11234", position: "ช่างภาพ" },
          ],
          image: employeeImage,
          position: "ช่างภาพ",
        },
      ],
    },
    {
      id: 1,
      title: "รับสมัคร Staff และช่างภาพประจำบูธ Manual",
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
      position: ["ช่างภาพ", "สตาฟ", "บริกร"],
      posWage: [1000, 500, 800],
      posReq: [3, 2, 1],
      posHave: [2, 2, 0],
      comment: [
        {
          id: 0,
          url:
            "https://drive.google.com/uc?id=10KxXNBYgwiTGCmYdl-h3rUpn_7isA0rT",
          commenter: "Jimmy",
          content: "asdasd",
          replyer: "has",
          reply: "asddas",
        },
        {
          id: 1,
          url:
            "https://drive.google.com/uc?id=10KxXNBYgwiTGCmYdl-h3rUpn_7isA0rT",
          commenter: "Jimmy2",
          content: "awed",
        },
      ],
      mode: "Manual",
      myEmployee: [
        {
          id: 0,
          firstName: "กล้าณรงค์",
          lastName: "ทมโคตร",
          gender: "ชาย",
          age: 20,
          introduceText: "...\n...\n...\n...",
          experience: [
            {
              work: "รับสมัคร staff งานเลี้ยงบริษัทแมวเหมียว ",
              position: "สตาฟ",
            },
            { work: "work11234", position: "รักษาความปลอดภัย" },
            { work: "work11234", position: "พนักงานต้อนรับ" },
            { work: "work11234", position: "บริกร" },
            { work: "work11234", position: "ช่างภาพ" },
          ],
          image: employeeImage,
          position: "สตาฟ",
        },
        {
          id: 1,
          firstName: "ขจร",
          lastName: "บุญเจริญ",
          gender: "ชาย",
          age: 21,
          introduceText: "...\n...\n...\n...",
          experience: [
            {
              work: "รับสมัคร staff งานเลี้ยงบริษัทแมวเหมียว ",
              position: "สตาฟ",
            },
            { work: "work11234", position: "รักษาความปลอดภัย" },
            { work: "work11234", position: "พนักงานต้อนรับ" },
            { work: "work11234", position: "บริกร" },
            { work: "work11234", position: "ช่างภาพ" },
          ],
          image: employeeImage,
          position: "สตาฟ",
        },
        {
          id: 2,
          firstName: "รวิสรา",
          lastName: "หนูเพ็ง",
          gender: "หญิง",
          age: 22,
          introduceText: "...\n...\n...\n...",
          experience: [
            {
              work: "รับสมัคร staff งานเลี้ยงบริษัทแมวเหมียว ",
              position: "สตาฟ",
            },
            { work: "work11234", position: "รักษาความปลอดภัย" },
            { work: "work11234", position: "พนักงานต้อนรับ" },
            { work: "work11234", position: "บริกร" },
            { work: "work11234", position: "ช่างภาพ" },
          ],
          image: employeeImage,
          position: "ช่างภาพ",
        },
      ],
      applicant: [
        {
          id: 0,
          firstName: "สมหญิง",
          lastName: "7",
          gender: "หญิง",
          age: 26,
          introduceText: "...\n...\n...\n...",
          experience: [
            {
              work: "รับสมัคร staff งานเลี้ยงบริษัทแมวเหมียว ",
              position: "สตาฟ",
            },
            { work: "work11234", position: "รักษาความปลอดภัย" },
            { work: "work11234", position: "พนักงานต้อนรับ" },
            { work: "work11234", position: "บริกร" },
            { work: "work11234", position: "ช่างภาพ" },
          ],
          image: employeeImage,
          position: "ช่างภาพ",
        },
      ],
      inviteEmployee: [
        {
          id: 0,
          firstName: "กล้าณรงค์",
          lastName: "ทมโคตร",
          gender: "ชาย",
          age: 20,
          introduceText: "...\n...\n...\n...",
          experience: [
            {
              work: "รับสมัคร staff งานเลี้ยงบริษัทแมวเหมียว ",
              position: "สตาฟ",
            },
            { work: "work11234", position: "รักษาความปลอดภัย" },
            { work: "work11234", position: "พนักงานต้อนรับ" },
            { work: "work11234", position: "บริกร" },
            { work: "work11234", position: "ช่างภาพ" },
          ],
          image: employeeImage,
          position: "สตาฟ",
        },
        {
          id: 1,
          firstName: "ขจร",
          lastName: "บุญเจริญ",
          gender: "ชาย",
          age: 21,
          introduceText: "...\n...\n...\n...",
          experience: [
            {
              work: "รับสมัคร staff งานเลี้ยงบริษัทแมวเหมียว ",
              position: "สตาฟ",
            },
            { work: "work11234", position: "รักษาความปลอดภัย" },
            { work: "work11234", position: "พนักงานต้อนรับ" },
            { work: "work11234", position: "บริกร" },
            { work: "work11234", position: "ช่างภาพ" },
          ],
          image: employeeImage,
          position: "ช่างภาพ",
        },
        {
          id: 2,
          firstName: "รวิสรา",
          lastName: "หนูเพ็ง",
          gender: "หญิง",
          age: 22,
          introduceText: "...\n...\n...\n...",
          experience: [
            {
              work: "รับสมัคร staff งานเลี้ยงบริษัทแมวเหมียว ",
              position: "สตาฟ",
            },
            { work: "work11234", position: "รักษาความปลอดภัย" },
            { work: "work11234", position: "พนักงานต้อนรับ" },
            { work: "work11234", position: "บริกร" },
            { work: "work11234", position: "ช่างภาพ" },
          ],
          image: employeeImage,
          position: "ช่างภาพ",
        },
        {
          id: 3,
          firstName: "วัชรินทร์",
          lastName: "กัณหา",
          gender: "ชาย",
          age: 23,
          introduceText: "...\n...\n...\n...",
          experience: [
            {
              work: "รับสมัคร staff งานเลี้ยงบริษัทแมวเหมียว ",
              position: "สตาฟ",
            },
            { work: "work11234", position: "รักษาความปลอดภัย" },
            { work: "work11234", position: "พนักงานต้อนรับ" },
            { work: "work11234", position: "บริกร" },
            { work: "work11234", position: "ช่างภาพ" },
          ],
          image: employeeImage,
          position: "บริกร",
        },
        {
          id: 4,
          firstName: "สิรินยา",
          lastName: "กำยาน",
          gender: "หญิง",
          age: 24,
          introduceText: "...\n...\n...\n...",
          experience: [
            {
              work: "รับสมัคร staff งานเลี้ยงบริษัทแมวเหมียว ",
              position: "สตาฟ",
            },
            { work: "work11234", position: "รักษาความปลอดภัย" },
            { work: "work11234", position: "พนักงานต้อนรับ" },
            { work: "work11234", position: "บริกร" },
            { work: "work11234", position: "ช่างภาพ" },
          ],
          image: employeeImage,
          position: "ช่างภาพ",
        },
        {
          id: 5,
          firstName: "นราวิชญ์",
          lastName: "ไตรพรม",
          gender: "ชาย",
          age: 25,
          introduceText: "...\n...\n...\n...",
          experience: [
            {
              work: "รับสมัคร staff งานเลี้ยงบริษัทแมวเหมียว ",
              position: "สตาฟ",
            },
            { work: "work11234", position: "รักษาความปลอดภัย" },
            { work: "work11234", position: "พนักงานต้อนรับ" },
            { work: "work11234", position: "บริกร" },
            { work: "work11234", position: "ช่างภาพ" },
          ],
          image: employeeImage,
          position: "บริกร",
        },
        {
          id: 6,
          firstName: "สมหญิง",
          lastName: "7",
          gender: "หญิง",
          age: 26,
          introduceText: "...\n...\n...\n...",
          experience: [
            {
              work: "รับสมัคร staff งานเลี้ยงบริษัทแมวเหมียว ",
              position: "สตาฟ",
            },
            { work: "work11234", position: "รักษาความปลอดภัย" },
            { work: "work11234", position: "พนักงานต้อนรับ" },
            { work: "work11234", position: "บริกร" },
            { work: "work11234", position: "ช่างภาพ" },
          ],
          image: employeeImage,
          position: "ช่างภาพ",
        },
      ],
    },
  ],
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case ACTION_JOB_EMPLOYER_SET:
      return { ...state, data: payload };
    default:
      return state;
  }
};
