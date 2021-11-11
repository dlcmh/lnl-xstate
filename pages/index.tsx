import type { NextPage } from 'next'
import { Footer } from 'src/components/Footer/Footer'
import { Search } from 'src/components/Search/Search'
import styles from 'styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <Search />
      </main>

      <Footer />
    </div>
  )
}

export default Home
