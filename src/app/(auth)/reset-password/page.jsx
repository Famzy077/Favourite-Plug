import { Suspense } from 'react'
import React from 'react'
import ResetPasswordPage from './ResetPassword'

export const page = () => {
  return (
    <Suspense>
      <ResetPasswordPage />
    </Suspense>
  )
}

