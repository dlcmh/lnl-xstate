import { assign, createMachine } from 'xstate'

interface Context {
  tags: {
    _id: string
    name: string
  }[]
}

export enum State {
  fetched = 'fetched',
  fetching = 'fetching',
  idle = 'idle',
}

export enum Event {
  fetch = 'FETCH',
  reset = 'RESET',
}

enum Action {
  reset = 'reset',
  setResult = 'setResult',
}

enum Service {
  quoteTagsFetcher = 'quoteTagsFetcher',
}

export const quoteTagsMachine = createMachine<Context>(
  {
    id: 'quoteTags',
    initial: State.idle,
    context: {
      tags: [],
    },
    states: {
      [State.idle]: {
        on: {
          [Event.fetch]: {
            target: State.fetching,
          },
        },
      },
      [State.fetched]: {
        on: {
          [Event.reset]: {
            actions: Action.reset,
            target: State.idle,
          },
        },
      },
      [State.fetching]: {
        invoke: {
          src: Service.quoteTagsFetcher,
          onDone: {
            actions: [Action.setResult],
            target: State.fetched,
          },
          onError: {
            target: State.fetched,
          },
        },
      },
    },
  },
  {
    actions: {
      [Action.reset]: assign({
        tags: (_) => [],
      }),
      [Action.setResult]: assign({
        tags: (_, event) => {
          // console.log('dlc setResult event', event)
          // {
          //   type: "done.invoke.allTagsFetcher",
          //   data: [Object, ...]
          // }

          return event.data
        },
      }),
    },
    services: {
      // [Service.allTagsFetcher]: async () => {
      //   const response = await fetch('https://quotable.io/tags')
      //   return await response.json()
      // },
      [Service.quoteTagsFetcher]: () =>
        fetch('https://quotable.io/tags').then((response) => response.json()),
    },
  }
)
