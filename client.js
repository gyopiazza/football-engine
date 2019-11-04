import { h, app } from "hyperapp"
import { Http } from "hyperapp-fx"

const Log = (() => {
  const effectFn = (dispatch, opts) => console.log(opts.message)
  return message => [effectFn, { message }]
})()

// Actions
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


app({
  init: {
    schemas: [],
    teams: []
  },
  view: state =>
    h("main", {}, [
      h("h1", null, 'Schemas'),
      h("ul", null, Object.keys(state.schemas).map(schema => h("li", null, schema))),
      h("button", { onClick: [loadData, {test: true}] }, "load"),
      h("pre", {}, JSON.stringify(state, null, 2)),
    ]),
  node: document.getElementById("app")
})