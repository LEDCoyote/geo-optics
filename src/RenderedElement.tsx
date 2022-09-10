import React, { ReactElement } from 'react'
import { Rect, Ellipse, Line } from 'react-konva'
import { CANVAS_HEIGHT } from './Diagram'

interface Props {
  power: number,
  height: number,
  z: number,
  y: number,
}

const createConcaveLensPoints = (y: number, h: number, z: number, w: number): number[] => {
  return [
    z-w/2, y,
    z+w/2, y,
    z+w/2-3, y+h/4,
    z+w/2-4, y+h/2,
    z+w/2-3, y+3*h/4,
    z+w/2, y+h,
    z-w/2, y+h,
    z-w/2+3, y+3*h/4,
    z-w/2+4, y+h/2,
    z-w/2+3, y+h/4,
  ]
}

const RenderedElement = (props: Props) => {
  const renderLens = (): ReactElement | null => {
    if (props.power > 0) {
      return <Ellipse
        x={props.z}
        y={props.y + props.height/2}
        radiusX={7.5}
        radiusY={props.height/2}
        fill='blue'
      />
    } else if (props.power < 0) {
      return <Line 
        points={createConcaveLensPoints(props.y, props.height, props.z, 15)}
        closed={true}
        fill='blue'
      />
    }
    return null
  }
  
  return (
    <>
      {renderLens()}
      <Rect
        x={props.z}
        y={0}
        width={8}
        height={(CANVAS_HEIGHT-props.height)/2}
        fill='black'
      />
      <Rect
        x={props.z}
        y={(CANVAS_HEIGHT+props.height)/2}
        width={8}
        height={(CANVAS_HEIGHT-props.height)/2}
        fill='black'
      />
    </>
  )
}

export default RenderedElement