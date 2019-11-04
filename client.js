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
function App(props) {
  return <main>
    <h1></h1>
  </main>
}

function EditSchema(props) {
  return <div>
    <h1>Edit {props.selectedSchema}</h1>
  </div>
}

app({
  init: {
    schemas: [],
    selectedSchema: '',
    teams: []
  },
  view: state =>
    h("main", {}, [
      h("h1", null, 'Schemas'),
      h("ul", null, Object.keys(state.schemas)
        .map(schema => h("li", { onClick: [setSelectedSchema, schema] },
                         state.selectedSchema === schema ? '-> ' + schema : schema))),
      h("button", { onClick: [loadData, {test: true}] }, "load"),
      h("pre", {}, JSON.stringify(state, null, 2)),
    ]),
  node: document.getElementById("app")
})