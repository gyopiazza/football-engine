import { h, app } from "hyperapp"
import { Http } from "hyperapp-fx"

const Log = (() => {
  const effectFn = (dispatch, opts) => console.log(opts.message)
  return message => [effectFn, { message }]
})()

const test = (state, payload) => {
  // return [state * 2, Log(payload)]
  return [state, multiplyFx(payload)]
}


const loadStories = (state, payload) => [
  state,
  getStoriesFx(payload)
]

const getStoriesFx = payload => [
  getStories,
  payload
]

const getStories = (payload, dispatch) => {
  setTimeout(() => dispatch(, 1000)
}


app({
  init: 0,
  view: state =>
    h("main", {}, [
      h("h1", {}, state),
      h("button", { onClick: state => state - 1 }, "-"),
      h("button", { onClick: state => state + 1 }, "+"),
      h("button", { onClick: [test, {test: true}] }, "load")
    ]),
  node: document.getElementById("app")
})