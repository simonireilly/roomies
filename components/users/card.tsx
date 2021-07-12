import { signOut, useSession } from 'next-auth/client'
import { useRouter } from 'next/dist/client/router'
import Image from 'next/image'
import Link from 'next/link'
import { FC, useState } from 'react'
import { genRanHex } from '../../utils/room-numbers'
import styles from './card.module.css'

export const Card: FC = () => {
  const [session] = useSession()
  const { push } = useRouter()
  const { user } = session
  const [roomId, setRoomId] = useState(null)
  const onSubmit = (e) => {
    e.preventDefault()
    push(`/online/${roomId}`)
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.profileWrapper}>
        <Image
          className="user--image"
          src={user.image}
          alt="Picture of the author"
          width={50}
          height={50}
        />
        <div>
          <h3>{user.name}</h3>
        </div>
      </div>
      <div>
        <Link href={`/online/${genRanHex(6)}`} passHref>
          <button className="button button--positive">Host a game</button>
        </Link>
      </div>
      <div>
        <button className="button button--negative" onClick={() => signOut()}>
          Sign out
        </button>
      </div>
      <div>
        <form onSubmit={onSubmit}>
          <label>
            Join a room: <input onChange={(e) => setRoomId(e.target.value)} />
          </label>
        </form>
      </div>
    </div>
  )
}
