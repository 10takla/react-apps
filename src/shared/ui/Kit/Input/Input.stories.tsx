import Input, { InputThemes } from './Input';

export default {
  title: 'Kit/Input',
  component: Input,
  argTypes: {
    theme: {
      control: "select",
      options: [undefined, ...Object.values(InputThemes)]
    },
    // round: {
    //   control: "select",
    //   options: [undefined, Array(8).fill(null).map((_, i))]
    // },
  },
  args: {
    placeholder: '',
    value: '0.00246',
    theme: undefined,
    round: undefined
  },
};

export const Base = {
};

export const Number = {
  args: {
    type: 'number'
  }
};