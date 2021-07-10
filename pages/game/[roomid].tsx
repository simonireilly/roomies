import { RoomServiceProvider } from '@roomservice/react'
import { NextPage } from 'next'
import { useSession } from 'next-auth/client'
import Room from '../../page-components/room'

const RoomId: NextPage = () => {
  const [session, loading] = useSession()

  if (loading) return null
  if (!loading && !session) return <p>Access Denied</p>

  return (
    <RoomServiceProvider clientParameters={{ auth: '/api/roomservice' }}>
      <Room />
    </RoomServiceProvider>
  )
}
export default RoomId
