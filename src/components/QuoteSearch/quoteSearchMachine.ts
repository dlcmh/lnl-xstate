import { assign, createMachine, send } from 'xstate'

export const quoteSearchMachine = createMachine<any>(
  {
    id: 'search',
    initial: 'idle',
    context: {
      phrase: undefined,
    },
    states: {
      idle: {},
      searching: {},
    },
    on: {
      PERFORM_SEARCH: {
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
      sendSearchEvent: send({
        type: 'PERFORM_SEARCH',
      }),
      setPhrase: assign({
        phrase: (_, event) => event.data.trim(),
      }),
    },
    guards: {
      phraseIsValid: (context) => context.phrase.length > 0,
    },
  }
)
