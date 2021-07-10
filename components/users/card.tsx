import { signOut, useSession } from 'next-auth/client'
import Image from 'next/image'
import Link from 'next/link'
import styles from './card.module.css'

export const Card = () => {
    const [session, loading] = useSession()
    const { user } = session

    return <div className={styles.wrapper}>
        <div className={styles.profileWrapper}>
            <Image
                className="user--image"
                src={user.image}
                alt="Picture of the author"
                width={50}
                height={50}
            />
            <div>
                <h3>
                    {user.name}
                </h3>
            </div>
        </div>
        <div>
            <Link href="/game/112233">
                <button className="button button--positive">
                    Find a game?
                </button>
            </Link>
        </div>
        <div>
            <button className="button button--negative" onClick={() => signOut()}>Sign out</button>
        </div>
    </div >
}