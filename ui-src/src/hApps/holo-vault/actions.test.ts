import configureMockStore, { MockStoreEnhanced } from 'redux-mock-store'
// @ts-ignore
import * as vaultActions from './actions'
// import {initialState} from './reducer'

const mockStore = configureMockStore()
let store: MockStoreEnhanced

beforeEach(() => {
  store = mockStore({})
})

const asyncActionTestTable: Array<[string, any, any, any]> = [
  [
    'create_persona',
    vaultActions.CreatePersona,
		{ name: 'test persona', id: 'test_persona' },
    'xxx'
  ],
  [
    'get_personas',
    vaultActions.GetPersonas,
    null,
		[{ name: 'test persona', id: 'test_persona' }, { name: 'test persona', id: 'test_persona' }]
  ],
  [
    'add_field',
    vaultActions.AddField,
		{ personaHash: 'xxx', field: { name: 'fieldName', data: 'data' } },
    true
  ],
  [
    'get_profiles',
    vaultActions.GetProfiles,
    {},
    [{ name: 'profile1' }, { name: 'profile2' }]
  ],
  [
    'create_mapping',
    vaultActions.CreateMapping,
    {
      retrieverDNA: 'XYZ',
      profileFieldName: 'handle',
      personaHash: 'QmbzbwpLA8HjZCFqkPQE2TAEnugUPYz14W9Ux1hh8882Nr', // implies field is already mapped
      personaFieldName: 'nickName'
    },
    1
  ]
]

asyncActionTestTable.forEach(([name, action, testInput, testResponse]) => {

  describe(`${name} action`, () => {

    it('should create an action that is correctly structured given parameters', () => {
      store.dispatch(action.create(testInput))
      expect(store.getActions()[0]).toEqual(action.create(testInput))
    })
  })
})
