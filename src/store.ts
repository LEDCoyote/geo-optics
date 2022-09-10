import { atom, selector } from 'recoil'

export interface Element {
  z_position: number,
  y_height: number,
  power: number,
  name: string,
}

export interface Ray {
  z_initial: number,
  z_length?: number,
  y_initial: number,
  angle: number,
  color: string,
  name: string,
}

export interface StackItem {
  power: number,
  z_length: number,
  y_stop_height: number,
}

export const dimensions = atom({
  key: 'dimensions',
  default: {
    y_max: 100,
    z_max: 1000,
  },
})

export const elements = atom<Element[]>({
  key: 'elements',
  default: [
    {
      z_position: 500,
      y_height: 50,
      power: 0.005,
      name: 'lens1',
    },
    {
      z_position: 250,
      y_height: 30,
      power: -0.004,
      name: 'lens2',
    },
  ],
})

export const rays = atom<Ray[]>({
  key: 'rays',
  default: [{
    z_initial: 0,
    y_initial: 0,
    angle: 25/500,
    color: 'red',
    name: 'ray1',
  },
  {
    z_initial: 0,
    y_initial: 0,
    angle: -25/500,
    color: 'green',
    name: 'ray2',
  },
  {
    z_initial: 0,
    y_initial: 25,
    angle: 0,
    color: 'orange',
    name: 'ray3',
  }],
})

export const stack = selector<StackItem[]>({
  key: 'stack',
  get: ({ get }) => {
    const dims = get(dimensions)
    const cs = get(elements)
      .filter((c) => c.z_position <= dims.z_max)
      .sort((a, b) => a.z_position - b.z_position)
    
    if (cs.length === 0) {
      return [{
        power: 0,
        z_length: dims.z_max,
        y_stop_height: dims.y_max,
      }]
    }

    const result: StackItem[] = []
    if (cs[0].z_position > 0) {
      result.push({
        power: 0,
        z_length: cs[0].z_position,
        y_stop_height: dims.y_max,
      })
    }

    for (let i = 0; i < cs.length - 1; i++) {
      result.push({
        power: cs[i].power,
        z_length: cs[i+1].z_position - cs[i].z_position,
        y_stop_height: cs[i].y_height,
      })
    }

    result.push({
      power: cs[cs.length - 1].power,
      z_length: dims.z_max - cs[cs.length - 1].z_position,
      y_stop_height: cs[cs.length - 1].y_height,
    })
  
    return result
  },
})

export const rayPropagation = selector<Ray[][]>({
  key: 'rayPropagation',
  get: ({ get }) => {
    const rs = get(rays)
    const stk = get(stack)
    const result: Ray[][] = []

    for (let i = 0; i < rs.length; i++) {
      const path: Ray[] = []
      path.push({...rs[i], z_length: stk[0].z_length})

      let z_acc = rs[i].z_initial
      for (let j = 0; j < stk.length - 1; j++) {
        z_acc += stk[j].z_length
        const newY = path[j].y_initial + path[j].angle*stk[j].z_length
        const newA = path[j].angle - newY*stk[j+1].power
        if (Math.abs(newY) > stk[j+1].y_stop_height) {
          break
        }
        path.push({
          z_initial: z_acc,
          z_length: stk[j+1].z_length,
          y_initial: newY,
          angle: newA,
          color: path[j].color,
          name: path[j].name,
        })
      }

      result.push(path)
    }
    return result
  },
})
