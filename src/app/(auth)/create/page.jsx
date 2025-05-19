import React from 'react'
import { Suspense } from 'react'
import CreateAccount from './createAccount'

const page = () => {
  return (
    <div>
      <Suspense>
        <CreateAccount />
      </Suspense>
    </div>
  )
}

export default page
