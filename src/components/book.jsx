import React from "react";
import {
  Button,
  Cascader,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Mentions,
  Select,
  TreeSelect,
} from "antd";
import PrevostX345SeatLayout from "./BusSeat/seat";
const { RangePicker } = DatePicker;
const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 6,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 14,
    },
  },
};
const Book = () => (
  <Form
    {...formItemLayout}
    variant="filled"
    style={{
      maxWidth: 600,
    }}
  >
    <Form.Item
      label="FullNames"
      name="FullNames"
      rules={[
        {
          required: true,
          message: "Please input!",
        },
      ]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      label="TellNumber"
      name="TellNumber"
      rules={[
        {
          required: true,
          message: "Please input!",
        },
      ]}
    >
      <InputNumber
        style={{
          width: "100%",
        }}
      />
    </Form.Item>

    {/* <Form.Item
      label="TextArea"
      name="TextArea"
      rules={[
        {
          required: true,
          message: "Please input!",
        },
      ]}
    >
      <Input.TextArea />
    </Form.Item>

    <Form.Item
      label="Mentions"
      name="Mentions"
      rules={[
        {
          required: true,
          message: "Please input!",
        },
      ]}
    >
      <Mentions />
    </Form.Item> */}

    <Form.Item
      label="Destination"
      name="Destination"
      rules={[
        {
          required: true,
          message: "Please input!",
        },
      ]}
    >
      <Select />
    </Form.Item>

    <Form.Item
      label="Choose a bus"
      name="Choose a bus"
      rules={[
        {
          required: true,
          message: "Please input!",
        },
      ]}
    >
      <Cascader />
    </Form.Item>

    <Form.Item
      label="Select travel date"
      name="Select travel date"
      rules={[
        {
          required: true,
          message: "Please input!",
        },
      ]}
    >
      <DatePicker />
    </Form.Item>

    <Form.Item
      label="Choose departure time"
      name="Choose departure time"
      rules={[
        {
          required: true,
          message: "Please input!",
        },
      ]}
    >
      <TreeSelect />
    </Form.Item>

    <Form.Item
      label="Select seat"
      name="Select seat"
      rules={[
        {
          required: true,
          message: "Please choose a seat!",
        },
      ]}
    >
      <div>
        <PrevostX345SeatLayout />
      </div>
    </Form.Item>

    <Form.Item
      wrapperCol={{
        offset: 6,
        span: 16,
      }}
    >
      <Button type="primary" htmlType="submit">
        Proceed to payment
      </Button>
    </Form.Item>
  </Form>
);
export default Book;
