import { useSession, signIn } from 'next-auth/client'
import React, { FC } from 'react'
import { Card } from './card'
import Link from 'next/link'

export const Session: FC = () => {
  const [session, loading] = useSession()

  if (loading) return null

  return (
    <div>
      <div>
        {!session && (
          <div>
            <span>Play online: &nbsp;</span>
            <button className="button" onClick={() => signIn('github')}>
              Sign in with GitHub
            </button>
          </div>
        )}
        {session && <Card />}
        <hr />
        <div>
          <span>Play offline (anonymous): &nbsp;</span>
          <Link href="/local" passHref>
            <button className="button">Time trial</button>
          </Link>
        </div>
      </div>
    </div>
  )
}
