import React, { useState } from 'react'
import { useRecoilState } from 'recoil'
import { dimensions } from './store'

const DimensionInput = () => {
  const [dims, setDims] = useRecoilState(dimensions)
  const [z, setZ] = useState(dims.z_max)
  const [y, setY] = useState(dims.y_max)

  const onUpdateZ = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newZ = parseInt(e.target.value)
    if (!isNaN(newZ)) setZ(Math.abs(newZ))
  }

  const onUpdateY = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newY = parseInt(e.target.value)
    if (!isNaN(newY)) setY(Math.abs(newY))
  }

  const onSubmitChanges = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setDims({
      z_max: z,
      y_max: y,
    })
  }

  return (
    <form onSubmit={onSubmitChanges}>
      <label>
        z_maximum:
        <input value={z} onChange={onUpdateZ}/>
      </label>
      <label>
        y_maximum:
        <input value={y} onChange={onUpdateY}/>
      </label>
      <input type='submit' value='Set'/>
    </form>
  )
}

export default DimensionInput