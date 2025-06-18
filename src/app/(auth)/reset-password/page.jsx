import { Suspense } from 'react'
import React from 'react'
import ResetPasswordPage from './ResetPassword'

const page = () => {
  return (
    <Suspense>
      <ResetPasswordPage />
    </Suspense>
  )
}

export default page
