import { RoomServiceProvider } from '@roomservice/react'
import { useSession } from 'next-auth/client'
import Room from '../../page-components/room'

export default function RoomId() {
  const [session, loading] = useSession()

  if (loading) return null
  if (!loading && !session) return <p>Access Denied</p>

  return (
    <RoomServiceProvider clientParameters={{ auth: '/api/roomservice' }}>
      <Room />
    </RoomServiceProvider>
  )
}
