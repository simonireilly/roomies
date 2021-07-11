import { NextPage } from 'next'
import { Session } from '../components/users/session'

const Home: NextPage = () => {
  return (
    <main>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          minHeight: '100vh',
          padding: '1em',
        }}
      >
        <h1>Welcome to roomies</h1>
        <Session />
        <p>Roomies is a web game, written with these web tools:</p>
        <ul>
          <li>
            <a href="https://nextjs.org/">Next.js</a> - Makes the site
          </li>
          <li>
            <a href="https://www.roomservice.dev/">Roomservice</a> - Powers
            realtime features
          </li>
          <li>
            <a href="https://next-auth.js.org/">NextAuth.js</a> - Handles
            sessions with ease
          </li>
        </ul>
        <p>
          Roomies has a companion site for learning how to build websites with
          Next.js, Typescript, Vercel and Github
        </p>
      </div>
    </main>
  )
}

export default Home
