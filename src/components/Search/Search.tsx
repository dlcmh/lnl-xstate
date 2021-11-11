import Head from 'next/head'
import styles from 'styles/Home.module.css'

export function Search() {
  return (
    <>
      <Head>
        <title>Debounced Search with XState</title>
        <meta name="description" content="Debounced Search with XState" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className={styles.title}>Debounced Search with XState</h1>

      <p className={styles.description}>Enter search:</p>

      <input />

      <div className={styles.grid}>
        <div className={styles.card}>
          <h2>Search results &rarr;</h2>
          <p>Find in-depth information about Next.js features and API.</p>
        </div>
      </div>
    </>
  )
}
