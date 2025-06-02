import React from 'react'
import { useState, useEffect, useContext } from 'react'

const UserUniqueContext = () => {
  useEffect(() => {
    const userId = localStorage.getItem('FavoritePlugUser')
    const context = useContext("User details", " ", userId)
    console.log(context)
    }, [])

  return (
    <div>
      <h1>Hello World</h1>
    </div>
  )
}

export default UserUniqueContext
