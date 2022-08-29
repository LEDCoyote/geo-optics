import React from 'react'
import { Rect } from 'react-konva'

interface Props {
  power: number,
  height: number,
  z: number,
  y: number,
}

const RenderedComponent = (props: Props) => {
  return (
    <Rect 
      x={props.z - 5}
      y={props.y}
      width={10}
      height={props.height}
      fill='blue'
    />
  )
}

export default RenderedComponent