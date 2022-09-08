import React, { useState } from 'react'
import { useRecoilState } from 'recoil'
import RayEditor, { RayEditState } from './RayEditor'
import { Ray, rays } from './store'

const Rays = () => {
  const [rs, setRs] = useRecoilState(rays)
  const [newRayName, setNewRayName] = useState('newRay')

  const editRay = (edits: RayEditState) => {
    const index = rs.findIndex((r) => r.name === edits.name)
    const newRay: Ray = {
      ...rs[index],
      y_initial: parseInt(edits.y),
      angle: parseFloat(edits.angle),
      color: edits.color,
    }
    const newRs = [...rs]
    newRs[index] = newRay
    setRs(newRs)
  }

  const deleteRay = (ray: Ray) => {
    const index = rs.findIndex((r) => r.name === ray.name)
    const newRs = [...rs]
    newRs.splice(index, 1)
    setRs(newRs)
  }

  const addRay = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const newRay: Ray = {
      name: newRayName,
      y_initial: 0,
      angle: 0,
      color: 'red',
      z_initial: 0,
    }
    const newRs = [...rs]
    newRs.push(newRay)
    setRs(newRs)
    setNewRayName('newRay')
  }

  return (
    <>
      <div>Rays:</div>
      {rs.map((r) => {
        return (
          <RayEditor ray={r} onSubmitEdit={editRay} onDeleteRay={deleteRay}/>
        )
      })}
      <form onSubmit={addRay}>
        <label>
          new_ray_name:
          <input value={newRayName} onChange={(e) => setNewRayName(e.target.value)}/>
          <input type='submit' value='Add' disabled={rs.findIndex((r) => r.name === newRayName) !== -1}/>
        </label>
      </form>
    </>
  )
}

export default Rays