export default [{
    name: "apply",
    description: "Bấm vào này để tạo form tuyển dụng",
    options: [
      {
        name: "delete_all",
        description: "Xóa toàn bộ dữ liệu đang có",
        type: 'SUB_COMMAND'
      }, {
        name: "set",
        description: "Tạo một form mới",
        type: 'SUB_COMMAND',
        options: [
          {
            name: `channel_logs`,
            channelTypes:['GUILD_TEXT'],
            description: `Chọn kênh log`,
            required: true,
            type: "CHANNEL",
          },
          {
            name: `name`,
            description: `Nhập tên`,
            required: true,
            type: "STRING",
          },
          {
            name: `button_name`,
            description: `Tên cho cái nút bấm`,
            required: true,
            type: "STRING",
          },
          {
            name: `message_content`,
            description: `Tin nhắn kèm`,
            required: true,
            type: "STRING",
          },
          {
            name: `button_color`,
            description: `Màu cho cái nút`,
            required: true,
            choices:[
              {
                name:`Blue`,value:"1"
              },
              {
                name:`Green`,value:"3"
              },
              {
                name:`Gray`,value:"2"
              },
              {
                name:`Red`,value:"4"
              }
            ],
            type: "STRING",
          },
          {
            name: `question_name_1`,
            description: "Câu hỏi đầu tiên",
            required: true,
            type: "STRING",
          },
          {
            name: `question_type_1`,
            description: `Loại câu hỏi`,
            required: true,
            choices:[
              {
                name:`Trả lời dài`,value:"paragraph"
              },
              {
                name:`Trả lời ngắn`,value:"short"
              }
            ],
            type: "STRING",
          },
          {
            name: `question_name_2`,
            description: "Câu hỏi thứ hai",
            required: true,
            type: "STRING",
          },
          {
            name: `question_type_2`,
            description: `Loại câu hỏi`,
            required: true,
            choices:[
              {
                name: `Trả lời dài`,value:"paragraph"
              },
              {
                name:`Trả lời ngắn`,value:"short"
              }
            ],
            type: "STRING",
          },
          {
            name: `question_name_3`,
            description: "Câu hỏi thứ ba",
            required: true,
            type: "STRING",
          },
          {
            name: `question_type_3`,
            description: `Loại câu hỏi`,
            required: true,
            choices:[
              {
                name:`Trả lời dài`,value:"paragraph"
              },
              {
                name:`Trả lời ngắn`,value:"short"
              }
            ],
            type: "STRING",
          },
          {
            name: `question_name_4`,
            description: "Câu hỏi thứ tư",
            required: true,
            type: "STRING",
          },
          {
            name: `question_type_4`,
            description: `Loại câu hỏi`,
            required: true,
            choices:[
              {
                name:`Trả lời dài`,value:"paragraph"
              },
              {
                name:`Trả lời ngắn`,value:"short"
              }
            ],
            type: "STRING",
          },
          {
            name: `question_name_5`,
            description: "Câu hỏi thứ năm",
            required: true,
            type: "STRING",
          },
          {
            name: `question_type_5`,
            description: `Loại câu hỏi`,
            required: true,
            choices:[
              {
                name:`Trả lời dài`,value:"paragraph"
              },
              {
                name:`Trả lời ngắn`,value:"short"
              }
            ],
            type: "STRING",
          },
          {
            name: `image_url`,
            description: "If you have a picture, you can put the link to the picture",
            required: true,
            type: "STRING",
          }
        ]
      }]
  },
]