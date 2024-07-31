import { ComponentProps, ReactElement } from 'react';
import Draggable from './Draggable';
import Vector from "S/lib/geometry/vector";

export default {
  title: 'Kit/Draggable',
  component: Draggable,
  parameters: {
    layout: 'centered',
  },
  args: {
    isResetPosition: false,
    direction: undefined,
    step: 1,
    translateX: -100,
    translateY: 210,
  },
  argTypes: {
    isResetPosition: { control: 'boolean' },
    direction: { control: 'select', options: [undefined, 'x', 'y'] },
    children: { table: { disable: true } },
    translateX: { control: { type: 'range', min: -120, max: 120, step: 0.1 } },
    translateY: { control: { type: 'range', min: -120, max: 120, step: 0.1 } }
  },
};

const children = (
  <div style={{
    width: '100px',
    height: '100px',
    backgroundColor: 'lightblue',
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: 'absolute'
  }}>
    Drag me
  </div>
)

interface BoundsRect {
  children: ReactElement
}

const BoundsRect = ({ children }: BoundsRect) => {
  return (
    <div
      style={{
        background: 'rgba(255, 0, 0, 0.493)',
        width: 300,
        height: 300,
        position: 'relative'
      }}>
      {children}
    </div>
  )
}

export const Base = ({ translateX, translateY, ...props }: ComponentProps<typeof Draggable>) => (
  <Draggable
    {...props}
    translate={new Vector(translateX, translateY)}
  >
    {children}
  </Draggable>
);

export const WithBounds = ({ translateX, translateY, ...props }: ComponentProps<typeof Draggable>) => (
  <BoundsRect>
    <Draggable
      boundsRectRef {...props}
      translate={new Vector(translateX, translateY)}
    >
      {children}
    </Draggable>
  </BoundsRect>
);