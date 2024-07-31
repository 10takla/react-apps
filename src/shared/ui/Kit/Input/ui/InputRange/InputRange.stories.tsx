import InputRange from './InputRange';
import { useState } from 'react';

export default {
  title: 'Kit/InputRange',
  component: InputRange,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    step: {
      control: {
        type: "range",
        min: 1,
        max: 100
      },
    },
    direction: {
      control: "select",
      options: ["x", "y"]
    },
    side: {
      control: "select",
      options: ["left", "right"]
    },
  },
};

export const Based = {
  args: {
    step: 1,
    min: 10,
    max: 200,
    values: [10, 100, 200],
    direction: 'x',
    side: 'left',
    onChange: (t) => {
      // console.log(t);
    }
  },
};

export const Extra = () => {
  const [value, setValue] = useState(220);

  return (
    <InputRange
      {...{
        step: 1,
        min: 10,
        max: 200,
        values: [value],
        direction: 'x',
        side: 'left',
        onChange: (t) => {
          setValue(t[0])
        }
      }}
    />
  )
} 