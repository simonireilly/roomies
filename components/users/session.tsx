import { useSession, signIn } from 'next-auth/client'
import React, { FC } from 'react'
import { Card } from './card'

export const Session: FC = () => {
  const [session, loading] = useSession()

  if (loading) return null

  return (
    <div>
      {!session && (
        <>
          <button className="button" onClick={() => signIn('github')}>
            Sign in with GitHub
          </button>
        </>
      )}
      {session && (
        <>
          <Card />
        </>
      )}
    </div>
  )
}
