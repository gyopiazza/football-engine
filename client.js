import { h, app } from "hyperapp"
import { Http } from "hyperapp-fx"

const Log = (() => {
  const effectFn = (dispatch, opts) => console.log(opts.message)
  return message => [effectFn, { message }]
})()

// Actions
const loadCompetitions = (state, payload) => [
  state,
  getCompetitionsFx(payload) // Call a proxy-function
  // [getCompetitions, payload]
]

const setCompetitions = (state, payload) => {
  console.log('setCompetitions', payload)
  return {
    ...state,
    data: payload
  }
}

// Effects
const getCompetitionsFx = payload => {
  console.log('getCompetitionsFx', payload)
  return [
    getCompetitions,
    payload
  ]
}

// Side effects
const getCompetitions = (dispatch, payload) => {
  console.log('getCompetitions', payload)
  fetch('/api')
    .then(response => response.json())
    .then(response => dispatch(setCompetitions, response))
  // setTimeout(() => dispatch(setCompetitions, {data: 'ok'}), 1000)
}


app({
  init: {
    data: ''
  },
  view: state =>
    h("main", {}, [
      h("h1", {}, JSON.stringify(state)),
      h("button", { onClick: [loadCompetitions, {test: true}] }, "load"),
    ]),
  node: document.getElementById("app")
})