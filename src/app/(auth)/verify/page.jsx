import React from 'react'
import { Suspense } from 'react'
import VerifyEmail from './Verify'

const page = () => {
  return (
    <div>
      <Suspense>
        <VerifyEmail/>
      </Suspense>
    </div>
  )
}

export default page
