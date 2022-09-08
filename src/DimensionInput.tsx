import React, { useState } from 'react'
import { useRecoilState } from 'recoil'
import { dimensions } from './store'

const DimensionInput = () => {
  const [dims, setDims] = useRecoilState(dimensions)
  const [zValid, setZValid] = useState(true)
  const [yValid, setYValid] = useState(true)
  const [z, setZ] = useState(dims.z_max.toString())
  const [y, setY] = useState(dims.y_max.toString())

  const onUpdateZ = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newZ = Math.abs(parseInt(e.target.value))
    if (isNaN(newZ)) {
      setZValid(false)
      setZ(e.target.value)
    } else {
      setZValid(true)
      setZ(newZ.toString())
    }
  }

  const onUpdateY = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newY = Math.abs(parseInt(e.target.value))
    if (isNaN(newY)) {
      setYValid(false)
      setY(e.target.value)
    } else {
      setYValid(true)
      setY(newY.toString())
    }
  }

  const onSubmitChanges = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setDims({
      z_max: parseInt(z),
      y_max: parseInt(y),
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
      <input type='submit' value='Set' disabled={!(zValid && yValid)}/>
    </form>
  )
}

export default DimensionInput