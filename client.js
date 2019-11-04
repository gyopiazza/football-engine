import { h, app } from "hyperapp"
import { Http } from "hyperapp-fx"

const Log = (() => {
  const effectFn = (dispatch, opts) => console.log(opts.message)
  return message => [effectFn, { message }]
})()

const test = (state, payload) => {
  return [state * 2, Log(payload)]
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