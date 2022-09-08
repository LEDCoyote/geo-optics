import React, { useState } from 'react'
import { Ray } from './store'

export interface RayEditState {
  y: string,
  angle: string,
  color: string,
  name: string,
  valid: boolean,
}

interface RayEditorProps {
  ray: Ray,
  onSubmitEdit: (edits:RayEditState) => void,
  onDeleteRay: (ray: Ray) => void,
}

const RayEditor = (props: RayEditorProps) => {
  const [rayEdit, setRayEdit] = useState<RayEditState>({
    y: props.ray.y_initial.toString(),
    angle: props.ray.angle.toString(),
    color: props.ray.color,
    name: props.ray.name,
    valid: true,
  })

  function validateEdits(): boolean {
    return !isNaN(parseInt(rayEdit.y)) && !isNaN(parseFloat(rayEdit.angle))
  }

  function updateRayEditY(e: React.ChangeEvent<HTMLInputElement>): void {
    const newY = parseInt(e.target.value)
    if (isNaN(newY)) {
      setRayEdit({...rayEdit, y: e.target.value, valid: validateEdits()})
    } else {
      setRayEdit({...rayEdit, y: newY.toString(), valid: validateEdits()})
    }
  }

  function updateRayEditA(e: React.ChangeEvent<HTMLInputElement>): void {
    // we don't set to the parsed value like for int, it doesn't play as nice with floats
    setRayEdit({...rayEdit, angle: e.target.value, valid: validateEdits()})
  }

  function updateRayEditC(e: React.ChangeEvent<HTMLInputElement>): void {
    setRayEdit({...rayEdit, color: e.target.value, valid: validateEdits()})
  }

  return (
    <form onSubmit={(e) => {
      e.preventDefault()
      props.onSubmitEdit(rayEdit)
    }}>
      <label>
        name:
        <input value={rayEdit.name} readOnly={true}/>
      </label>
      <label>
        y_initial:
        <input value={rayEdit.y} onChange={(e) => updateRayEditY(e)}/>
      </label>
      <label>
        angle:
        <input value={rayEdit.angle} onChange={(e) => updateRayEditA(e)}/>
      </label>
      <label>
        color:
        <input value={rayEdit.color} onChange={(e) => updateRayEditC(e)}/>
      </label>
      <input type='submit' value='Set' disabled={!rayEdit.valid}/>
      <button onClick={(e) => {
        e.preventDefault()
        props.onDeleteRay(props.ray)}
      }>Delete</button>
    </form>
  )
}

export default RayEditor
