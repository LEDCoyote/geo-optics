import React from 'react'
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  components,
  dimensions,
  rayPropagation,
} from './store'
import { Stage, Layer, Rect, Line } from 'react-konva';
import RenderedComponent from './RenderedComponent';

const CANVAS_WIDTH = window.innerWidth - 36
const CANVAS_HEIGHT = 400

const Diagram = () => {
  const [cmp] = useRecoilState(components)
  const [dims] = useRecoilState(dimensions)
  const rayProp = useRecoilValue(rayPropagation)

  const z2c = (z: number) => z * CANVAS_WIDTH / dims.z_max
  const y2c = (y: number) => y * CANVAS_HEIGHT / 2 / dims.y_max

  return (
    <Stage width={CANVAS_WIDTH} height={CANVAS_HEIGHT} style={{"padding": "10px"}}>
      <Layer>
        <Rect width={CANVAS_WIDTH} height={CANVAS_HEIGHT} stroke="black" strokeWidth={2}/>
        <Line
          points={[10,CANVAS_HEIGHT/2,CANVAS_WIDTH-10,CANVAS_HEIGHT/2]}
          stroke="gray"
          strokeWidth={2}
          dash={[15, 10]}
        />
        {cmp.map((c) => <RenderedComponent 
                          key={c.name}
                          power={c.power} 
                          height={y2c(c.y_height * 2)} 
                          z={z2c(c.z_position)}
                          y={CANVAS_HEIGHT/2 - y2c(c.y_height)}
                        />)}
        {rayProp.map((rs) => 
            rs.map((r) => <Line
              key={`${r.name}-${r.z_initial}`}
              points={[
                z2c(r.z_initial),
                CANVAS_HEIGHT/2 - y2c(r.y_initial),
                z2c(r.z_initial + (r.z_length ?? 0)),
                CANVAS_HEIGHT/2 - y2c(r.y_initial + r.angle*(r.z_length ?? 0)),
              ]} stroke={r.color} strokeWidth={2}
            />)
        )}
      </Layer>
    </Stage>
  )
}

export default Diagram