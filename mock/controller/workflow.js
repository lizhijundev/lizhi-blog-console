const data = {
  nodes: [
    {
      id: '742356ea-762b-4899-b96a-bd567e3c4361',
      type: 'start',
      x: 220,
      y: 170,
      properties: {},
      baseType: 'node',
    },
    {
      id: 'dacda6b6-48d3-4dff-911d-287704eb23d8',
      type: 'rect',
      x: 350,
      y: 170,
      properties: {},
      baseType: 'node',
      text: {
        x: 350,
        y: 170,
        value: '基础节点',
      },
    },
    {
      id: '49106603-2b88-4b2c-b1e8-723c1f2210bd',
      type: 'user',
      x: 530,
      y: 170,
      properties: {},
      baseType: 'node',
      text: {
        x: 530,
        y: 220,
        value: '自定义节点',
      },
    },
    {
      id: '647fa2bc-98ee-40cf-99c5-4756c0bc130d',
      type: 'push',
      x: 690,
      y: 170,
      properties: {},
      baseType: 'node',
      text: {
        x: 690,
        y: 220,
        value: '可添加下一个节点/节点组',
      },
    },
    {
      id: '37e7bac3-8804-4237-abe9-7b6065c207e9',
      type: 'download',
      x: 690,
      y: 320,
      properties: {},
      baseType: 'node',
    },
    {
      id: '6bb4396f-54c9-4b1c-b34c-87ef004f2e29',
      type: 'user',
      x: 840,
      y: 320,
      properties: {},
      baseType: 'node',
    },
    {
      id: 'abf76937-63b8-493c-a978-a4a58bc4f6b8',
      type: 'push',
      x: 840,
      y: 470,
      properties: {},
      baseType: 'node',
    },
    {
      id: 'b119f24f-2669-4a90-a837-afd853b2ffcc',
      type: 'end',
      x: 990,
      y: 320,
      properties: {},
      baseType: 'node',
    },
    {
      id: '60326ad9-cae2-4a85-ae98-d340fb7bd67f',
      type: 'end',
      x: 990,
      y: 470,
      properties: {},
      baseType: 'node',
    },
    {
      id: '414fe028-3609-4450-b0f4-e5aca7705e8c',
      type: 'download',
      x: 860,
      y: 170,
      properties: {},
      baseType: 'node',
      text: {
        x: 860,
        y: 220,
        value: '自定义节点-设置颜色',
      },
    },
  ],
  edges: [
    {
      id: '00f55245-513e-43a2-9cb0-adb61b01adc8',
      type: 'polyline',
      sourceNodeId: '742356ea-762b-4899-b96a-bd567e3c4361',
      targetNodeId: 'dacda6b6-48d3-4dff-911d-287704eb23d8',
      startPoint: {
        x: 240,
        y: 170,
      },
      endPoint: {
        x: 300,
        y: 170,
      },
      properties: {},
      pointsList: [
        {
          x: 240,
          y: 170,
        },
        {
          x: 300,
          y: 170,
        },
      ],
    },
    {
      id: 'bbf9754f-603e-48e4-85fe-84ed44459a6a',
      type: 'polyline',
      sourceNodeId: 'dacda6b6-48d3-4dff-911d-287704eb23d8',
      targetNodeId: '49106603-2b88-4b2c-b1e8-723c1f2210bd',
      startPoint: {
        x: 400,
        y: 170,
      },
      endPoint: {
        x: 495,
        y: 170,
      },
      properties: {},
      pointsList: [
        {
          x: 400,
          y: 170,
        },
        {
          x: 495,
          y: 170,
        },
      ],
    },
    {
      id: '12bb443b-4070-4a08-ad4d-2755ee856f0d',
      type: 'polyline',
      sourceNodeId: '49106603-2b88-4b2c-b1e8-723c1f2210bd',
      targetNodeId: '647fa2bc-98ee-40cf-99c5-4756c0bc130d',
      startPoint: {
        x: 565,
        y: 170,
      },
      endPoint: {
        x: 655,
        y: 170,
      },
      properties: {},
      pointsList: [
        {
          x: 565,
          y: 170,
        },
        {
          x: 655,
          y: 170,
        },
      ],
    },
    {
      id: '33fa3c09-9c29-4cb7-8373-67d537b8b623',
      type: 'polyline',
      sourceNodeId: '647fa2bc-98ee-40cf-99c5-4756c0bc130d',
      targetNodeId: '37e7bac3-8804-4237-abe9-7b6065c207e9',
      startPoint: {
        x: 690,
        y: 205,
      },
      endPoint: {
        x: 690,
        y: 295,
      },
      properties: {},
      pointsList: [
        {
          x: 690,
          y: 205,
        },
        {
          x: 690,
          y: 295,
        },
      ],
    },
    {
      id: '2b5a5e89-005e-4fda-9a44-dc795050534f',
      type: 'polyline',
      sourceNodeId: '37e7bac3-8804-4237-abe9-7b6065c207e9',
      targetNodeId: '6bb4396f-54c9-4b1c-b34c-87ef004f2e29',
      startPoint: {
        x: 715,
        y: 320,
      },
      endPoint: {
        x: 805,
        y: 320,
      },
      properties: {},
      pointsList: [
        {
          x: 715,
          y: 320,
        },
        {
          x: 805,
          y: 320,
        },
      ],
    },
    {
      id: '62b54f8a-bcfd-494b-9144-5aeb09ca77a1',
      type: 'polyline',
      sourceNodeId: '6bb4396f-54c9-4b1c-b34c-87ef004f2e29',
      targetNodeId: 'b119f24f-2669-4a90-a837-afd853b2ffcc',
      startPoint: {
        x: 875,
        y: 320,
      },
      endPoint: {
        x: 970,
        y: 320,
      },
      properties: {},
      text: {
        x: 920,
        y: 310,
        value: 'Y',
      },
      pointsList: [
        {
          x: 875,
          y: 320,
        },
        {
          x: 970,
          y: 320,
        },
      ],
    },
    {
      id: 'ba816d4a-5785-4911-9f78-03933f1463a1',
      type: 'polyline',
      sourceNodeId: '6bb4396f-54c9-4b1c-b34c-87ef004f2e29',
      targetNodeId: 'abf76937-63b8-493c-a978-a4a58bc4f6b8',
      startPoint: {
        x: 840,
        y: 355,
      },
      endPoint: {
        x: 840,
        y: 435,
      },
      properties: {},
      text: {
        x: 850,
        y: 400,
        value: 'N',
      },
      pointsList: [
        {
          x: 840,
          y: 355,
        },
        {
          x: 840,
          y: 435,
        },
      ],
    },
    {
      id: '2b3007ed-7a13-4db7-a1ea-6691d7564c34',
      type: 'polyline',
      sourceNodeId: 'abf76937-63b8-493c-a978-a4a58bc4f6b8',
      targetNodeId: '60326ad9-cae2-4a85-ae98-d340fb7bd67f',
      startPoint: {
        x: 875,
        y: 470,
      },
      endPoint: {
        x: 970,
        y: 470,
      },
      properties: {},
      pointsList: [
        {
          x: 875,
          y: 470,
        },
        {
          x: 970,
          y: 470,
        },
      ],
    },
    {
      id: '262e2263-6c8c-4a38-b223-97848e9b5767',
      type: 'polyline',
      sourceNodeId: '647fa2bc-98ee-40cf-99c5-4756c0bc130d',
      targetNodeId: '414fe028-3609-4450-b0f4-e5aca7705e8c',
      startPoint: {
        x: 725,
        y: 170,
      },
      endPoint: {
        x: 835,
        y: 170,
      },
      properties: {},
      pointsList: [
        {
          x: 725,
          y: 170,
        },
        {
          x: 835,
          y: 170,
        },
      ],
    },
  ],
}

module.exports = [
  {
    url: '/workflow/getList',
    type: 'get',
    response: () => {
      return {
        code: 200,
        msg: 'success',
        data,
      }
    },
  },
  {
    url: '/workflow/doEdit',
    type: 'post',
    response: () => {
      return {
        code: 200,
        msg: '模拟保存成功',
      }
    },
  },
]
