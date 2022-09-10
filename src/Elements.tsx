import React, { useState } from 'react'
import { useRecoilState } from 'recoil'
import ElementEditor, { ElementEditState } from './ElementEditor'
import { Element, elements } from './store'

const Elements = () => {
  const [els, setEls] = useRecoilState(elements)
  const [newElementName, setNewElementName] = useState('newElement')

  const editElement = (edits: ElementEditState) => {
    const index = els.findIndex((el) => el.name === edits.name)
    const newElement: Element = {
      ...els[index],
      y_height: parseInt(edits.y),
      z_position: parseInt(edits.z),
      power: parseFloat(edits.power),
    }
    const newEls = [...els]
    newEls[index] = newElement
    setEls(newEls)
  }

  const deleteElement = (element: Element) => {
    const index = els.findIndex((r) => r.name === element.name)
    const newEls = [...els]
    newEls.splice(index, 1)
    setEls(newEls)
  }

  const addElement = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const newElement: Element = {
      name: newElementName,
      y_height: 0,
      z_position: 0,
      power: 0,
    }
    const newEls = [...els]
    newEls.push(newElement)
    setEls(newEls)
    setNewElementName('newElement')
  }

  return (
    <>
      <div>Elements</div>
      {els.map((e) => {
        return (
          <ElementEditor element={e} onSubmitEdit={editElement} onDeleteElement={deleteElement}/>
        )
      })}
      <form onSubmit={addElement}>
        <label>
          new_element_name:
          <input value={newElementName} onChange={(e) => setNewElementName(e.target.value)}/>
          <input type='submit' value='Add' disabled={els.findIndex((el) => el.name === newElementName) !== -1}/>
        </label>
      </form>
    </>
  )
}

export default Elements