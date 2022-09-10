import React, { useState } from 'react'
import { Element } from './store'

export interface ElementEditState {
  y: string,
  z: string,
  power: string,
  name: string,
  valid: boolean,
}

interface RayEditorProps {
  element: Element,
  onSubmitEdit: (edits:ElementEditState) => void,
  onDeleteElement: (element: Element) => void,
}

const RayEditor = (props: RayEditorProps) => {
  const [elementEdit, setElementEdit] = useState<ElementEditState>({
    y: props.element.y_height.toString(),
    z: props.element.z_position.toString(),
    power: props.element.power.toString(),
    name: props.element.name,
    valid: true,
  })

  function validateEdits(): boolean {
    return !isNaN(parseInt(elementEdit.y))
      && !isNaN(parseInt(elementEdit.z))
      && !isNaN(parseFloat(elementEdit.power))
  }

  function updateElementEditY(e: React.ChangeEvent<HTMLInputElement>): void {
    const newY = parseInt(e.target.value)
    if (isNaN(newY)) {
      setElementEdit({...elementEdit, y: e.target.value, valid: validateEdits()})
    } else {
      setElementEdit({...elementEdit, y: newY.toString(), valid: validateEdits()})
    }
  }

  function updateElementEditZ(e: React.ChangeEvent<HTMLInputElement>): void {
    const newY = parseInt(e.target.value)
    if (isNaN(newY)) {
      setElementEdit({...elementEdit, z: e.target.value, valid: validateEdits()})
    } else {
      setElementEdit({...elementEdit, z: newY.toString(), valid: validateEdits()})
    }
  }

  function updateRayEditP(e: React.ChangeEvent<HTMLInputElement>): void {
    // we don't set to the parsed value like for int, it doesn't play as nice with floats
    setElementEdit({...elementEdit, power: e.target.value, valid: validateEdits()})
  }

  return (
    <form onSubmit={(e) => {
      e.preventDefault()
      props.onSubmitEdit(elementEdit)
    }}>
      <label>
        name:
        <input value={elementEdit.name} readOnly={true}/>
      </label>
      <label>
        y_height:
        <input value={elementEdit.y} onChange={(e) => updateElementEditY(e)}/>
      </label>
      <label>
        z_position:
        <input value={elementEdit.z} onChange={(e) => updateElementEditZ(e)}/>
      </label>
      <label>
        power:
        <input value={elementEdit.power} onChange={(e) => updateRayEditP(e)}/>
      </label>
      <input type='submit' value='Set' disabled={!elementEdit.valid}/>
      <button onClick={(e) => {
        e.preventDefault()
        props.onDeleteElement(props.element)}
      }>Delete</button>
    </form>
  )
}

export default RayEditor
