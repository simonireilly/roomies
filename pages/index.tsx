import { signIn, signOut, useSession } from 'next-auth/client'


export default function Home() {
  const [session, loading] = useSession()

  return <main>
    <div style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
      minHeight: "100vh"
    }}>
      <h1>
        Welcome to roomies
      </h1>
      <div>
        {!session && <>
          Not signed in <br />
          <button onClick={() => signIn()}>Sign in</button>
        </>}
        {session && <>
          Signed in as {session.user.email} <br />
          <button onClick={() => signOut()}>Sign out</button>
        </>}
      </div>
    </div>
  </main>
}
