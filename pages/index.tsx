import type { NextPage } from 'next'
import Head from 'next/head'
import { QuoteSearch } from 'src/components/QuoteSearch/QuoteSearch'
import { QuoteTags } from 'src/components/QuoteTags/QuoteTags'
import styles from 'styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Debounced Search with XState</title>
        <meta name="description" content="Debounced Search with XState" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <QuoteTags />
          <QuoteSearch />
        </div>
      </main>
    </div>
  )
}

export default Home
