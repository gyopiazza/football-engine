import { render } from "solid-js/web"
import { AppProvider, useState } from "./store";

const Main = () => {
  const [state, { loadData, setState }] = useState();

  return <main>
    <button onClick={loadData}>load</button>
    {(state.selectedSchema.name || state.selectedRecord.id) && <button onclick={cancelEditing}>cancel editing</button>}
    <h1>Schemas</h1>
    <ul>
      {Object.keys(state.schemas).map(schema =>
        <li onclick={[setSelectedSchema, state.schemas[schema]]}>
          {state.selectedSchema.name === schema ? '-> ' + schema : schema}
        </li>)}
    </ul>
    {state.selectedSchema.name && <EditSchema selectedSchema={state.selectedSchema} selectedRecord={state.selectedRecord} records={state.records[(state.selectedSchema.name || '').toLowerCase()] || []} />}
    <hr/>
    <pre>{JSON.stringify(state, null, 2)}</pre>
  </main>
}

const App = () => {
  return (
    <AppProvider count={7}>
      <Main />
    </AppProvider>
  );
};

render(App, document.getElementById("app"));