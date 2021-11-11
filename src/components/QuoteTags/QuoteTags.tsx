import { useMachine } from '@xstate/react'
import styles from 'styles/Home.module.css'
import { Event, quoteTagsMachine, State } from './quoteTagsMachine'

export function QuoteTags() {
  const [current, send] = useMachine(quoteTagsMachine)

  const {
    value: state,
    context: { tags },
  } = current

  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.title}>Fetch All Quote Tags</h1>

      <p className={styles.description}>
        {state === State.idle && (
          <button onClick={() => send({ type: Event.fetch })}>Fetch</button>
        )}
        {state === State.fetching && <button disabled>Fetching...</button>}
        {state === State.fetched && (
          <button onClick={() => send({ type: Event.reset })}> Reset </button>
        )}
        <br />
      </p>

      <p className={styles.machineMeta}>
        machine state: {state}
        <br />
        machine context tag count: {tags.length}
      </p>

      <div className={styles.grid}>
        <div className={styles.card}>
          <h2>Quote Tags &rarr;</h2>
          {tags.length
            ? tags.map((tag) => <button key={tag._id}>{tag.name}</button>)
            : null}
        </div>
      </div>
    </div>
  )
}
