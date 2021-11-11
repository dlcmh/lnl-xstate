import { useMachine } from '@xstate/react'
import styles from 'styles/Home.module.css'
import { quoteSearchMachine } from './quoteSearchMachine'

export function QuoteSearch() {
  const [current, send] = useMachine(quoteSearchMachine)

  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.title}>Debounced Quote Search with XState</h1>

      <p className={styles.description}>
        Enter search:
        <br />
        <input
          onChange={(event) =>
            send({ type: 'SEARCH_PHRASE_ENTERED', data: event.target.value })
          }
        />
        <br />
      </p>

      <p className={styles.machineMeta}>
        machine context: {JSON.stringify(current.context)}
        <br />
        machine state: {current.value}
      </p>

      <div className={styles.grid}>
        <div className={styles.card}>
          <h2>Search results &rarr;</h2>
          <p>Find in-depth information about Next.js features and API.</p>
        </div>
      </div>
    </div>
  )
}
