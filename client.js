import { h, app } from "hyperapp"
import { Http } from "hyperapp-fx"

const Log = (() => {
  const effectFn = (dispatch, opts) => console.log(opts.message)
  return message => [effectFn, { message }]
})()

// Actions
const loadStories = (state, payload) => [
  state,
  getStoriesFx(payload)
  // [getStories, payload]
]

const setStories = (state, payload) => {
  console.log('setStories', payload)
  return {
    ...state,
    data: payload.data
  }
}

// Effects
const getStoriesFx = payload => {
  console.log('getStoriesFx', payload)
  return [
    getStories,
    payload
  ]
}

// Side effects
const getStories = (dispatch, payload) => {
  console.log('getStories', payload)
  setTimeout(() => dispatch(setStories, {data: 'ok'}), 1000)
}


app({
  init: {
    data: ''
  },
  view: state =>
    h("main", {}, [
      h("h1", {}, JSON.stringify(state)),
      h("button", { onClick: [loadStories, {test: true}] }, "load"),
    ]),
  node: document.getElementById("app")
})