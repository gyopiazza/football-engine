import { h, app } from "hyperapp"
import { Http } from "hyperapp-fx"

const GetQuote = () => [
  "...",
  Http({
    url:
      "https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1",
    action: (_, [{ content }]) => content
  })
]

app({
  init: 0,
  view: state =>
    h("main", {}, [
      h("h1", {}, state),
      h("button", { onClick: state => state - 1 }, "-"),
      h("button", { onClick: state => state + 1 }, "+")
    ]),
  node: document.getElementById("app")
})