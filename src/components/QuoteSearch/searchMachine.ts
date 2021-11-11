import { assign, createMachine, send } from 'xstate'

interface Context {
  phrase: string | undefined
  tags: {
    _id: string
    name: string
  }[]
}

export const searchMachine = createMachine<Context>(
  {
    id: 'search',
    initial: 'idle',
    context: {
      phrase: undefined,
      tags: [],
    },
    states: {
      idle: {},
      idleWithPossibleResults: {
        on: {
          RESET: {
            actions: ['reset'],
          },
        },
      },
      searching: {
        invoke: {
          src: 'fetchAllTags',
          onDone: {
            actions: 'setResult',
            target: 'idleWithPossibleResults',
          },
          onError: {
            target: 'idleWithPossibleResults',
          },
        },
      },
    },
    on: {
      PERFORM_SEARCH: {
        target: 'searching',
        cond: 'phraseIsValid', // property of `guards` object
      },
      RESET: {
        target: 'searching',
        cond: 'phraseIsValid', // property of `guards` object
      },
      SEARCH_PHRASE_ENTERED: {
        actions: ['setPhrase', 'sendSearchEvent'],
      },
    },
  },
  {
    actions: {
      reset: assign({
        phrase: (_) => undefined,
        tags: (_) => [],
      }),
      sendSearchEvent: send({
        type: 'PERFORM_SEARCH',
      }),
      setPhrase: assign({
        phrase: (_, event) => event.data.trim(),
      }),
      setResult: assign({
        tags: (_, event) => {
          // console.log('dlc setResult event', event)
          // {
          //   type: "done.invoke.fetchAllTags",
          //   data: [Object, ...]
          // }

          return event.data
        },
      }),
    },
    guards: {
      phraseIsValid: (context) => (context.phrase || '').length > 0,
    },
    services: {
      fetchAllTags: async (context, event) => {
        console.log('dlc fetchAllTags context, event', context, event)

        const response = await fetch('https://quotable.io/tags')
        return await response.json()
      },
      // fetchAllTags: (context, event) => {
      //   console.log('dlc fetchAllTags context, event', context, event)

      //   return fetch('https://quotable.io/tags').then((response) =>
      //     response.json()
      //   )
      // },
    },
  }
)
