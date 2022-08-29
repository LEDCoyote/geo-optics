import React, { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { Ray, rays } from './store'

const Rays = () => {
  const [rs, setRs] = useRecoilState(rays)
  const [rsTemp, setRsTemp] = useState(rs)
  const [newRayName, setNewRayName] = useState('newRay')

  useEffect(() => {
    setRsTemp(rs)
  }, [rs])

  const updateRayTempY = (e: React.ChangeEvent<HTMLInputElement>, ray: Ray) => {
    const index = rsTemp.findIndex((r) => r.name === ray.name)
    const newRsTemp = [...rsTemp]
    newRsTemp[index] = {...newRsTemp[index], y_initial: parseInt(e.target.value)}
    setRsTemp(newRsTemp)
  }

  const updateRayTempA = (e: React.ChangeEvent<HTMLInputElement>, ray: Ray) => {
    const index = rsTemp.findIndex((r) => r.name === ray.name)
    const newRsTemp = [...rsTemp]
    newRsTemp[index] = {...newRsTemp[index], angle: parseFloat(e.target.value)}
    setRsTemp(newRsTemp)
  }

  const updateRayTempC = (e: React.ChangeEvent<HTMLInputElement>, ray: Ray) => {
    const index = rsTemp.findIndex((r) => r.name === ray.name)
    const newRsTemp = [...rsTemp]
    newRsTemp[index] = {...newRsTemp[index], color: e.target.value}
    setRsTemp(newRsTemp)
  }

  const editRay = (e: React.FormEvent<HTMLFormElement>, ray: Ray) => {
    e.preventDefault()
    const index = rs.findIndex((r) => r.name === ray.name)
    const newRs = [...rs]
    newRs[index] = ray
    setRs(newRs)
  }

  const deleteRay = (e: React.MouseEvent<HTMLButtonElement>, ray: Ray) => {
    e.preventDefault()
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
      {rsTemp.map((r) => {
        return (
          <form key={r.name} onSubmit={(e) => editRay(e, r)}>
            <label>
              name:
              <input value={r.name} readOnly={true}/>
            </label>
            <label>
              y_initial:
              <input value={r.y_initial} onChange={(e) => updateRayTempY(e, r)}/>
            </label>
            <label>
              angle:
              <input value={r.angle} onChange={(e) => updateRayTempA(e, r)}/>
            </label>
            <label>
              color:
              <input value={r.color} onChange={(e) => updateRayTempC(e, r)}/>
            </label>
            <input type='submit' value='Set'/>
            <button onClick={(e) => deleteRay(e,r)}>Delete</button>
          </form>
        )
      })}
      <form onSubmit={addRay}>
        <label>
          new_ray_name:
          <input value={newRayName} onChange={(e) => setNewRayName(e.target.value)}/>
          <input type='submit' value='Add'/>
        </label>
      </form>
    </>
  )
}

export default Rays