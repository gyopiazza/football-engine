import { h, app } from "hyperapp"
import { Http } from "hyperapp-fx"

const Log = (() => {
  const effectFn = (dispatch, opts) => console.log(opts.message)
  return message => [effectFn, { message }]
})()

// Actions
const setSelectedSchema = (state, schema) => ({
  ...state,
  selectedSchema: schema
})

const loadData = (state, payload) => [
  state,
  getDataFx(payload) // Call a proxy-function
  // [getData, payload]
]

const setData = (state, payload) => {
  console.log('setData', payload)
  return {
    ...state,
    schemas: payload.schemas,
    teams: payload.teams
  }
}

// Effects
const getDataFx = payload => {
  console.log('getDataFx', payload)
  return [
    getData,
    payload
  ]
}

// Side effects
const getData = (dispatch, payload) => {
  console.log('getData', payload)
  fetch('/api')
    .then(response => response.json())
    .then(response => dispatch(setData, response))
}

// Components
function App(state) {
  return <main>
    <button onclick={[loadData, { test: true }]}>load</button>
    <h1>Schemas</h1>
    <ul>
      {Object.keys(state.schemas).map(schema => 
        <li onclick={[setSelectedSchema, state.schemas[schema]]}>
          {state.selectedSchema.name === schema ? '-> ' + schema : schema}
        </li>)}
    </ul>
    {state.selectedSchema && <EditSchema selectedSchema={state.selectedSchema} />}
    <hr/>
    <pre>{JSON.stringify(state, null, 2)}</pre>
  </main>
}

function EditSchema({ selectedSchema }) {
  return <div>
    <h1>Edit {selectedSchema.name}</h1>
    <form>
      <fieldset>
        {Object.keys(selectedSchema.properties).map(prop => )}
      </fieldset>
    </form>
  </div>
}

app({
  init: {
    selectedSchema: {},
    schemas: [],
    teams: []
  },
  view: state => App(state),
    // h("main", {}, [
    //   h("h1", null, 'Schemas'),
    //   h("ul", null, Object.keys(state.schemas)
    //     .map(schema => h("li", { onClick: [setSelectedSchema, schema] },
    //                      state.selectedSchema === schema ? '-> ' + schema : schema))),
    //   h("button", { onClick: [loadData, {test: true}] }, "load"),
    //   h("pre", {}, JSON.stringify(state, null, 2)),
    // ]),
  node: document.getElementById("app")
})