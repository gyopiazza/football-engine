import { h, app } from "hyperapp"
import { Http } from "hyperapp-fx"

const Log = (() => {
  const effectFn = (dispatch, opts) => console.log(opts.message)
  return message => [effectFn, { message }]
})()

// Actions
const cancelEditing = state => ({
  ...state,
  selectedSchema: {},
  selectedRecord: {}
})

const setSelectedSchema = (state, schema) => ({
  ...state,
  selectedSchema: schema,
  selectedRecord: {}
})

const setSelectedRecord = (state, record) => {
  console.log('setSelectedRecord', record)
  return {
    ...state,
    selectedRecord: record
  }
}

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
    records: payload.records
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

function EditSchema({ selectedSchema, selectedRecord, records }) {
  return <div style={{ display: 'flex' }}>
    <div>
      <h2>{selectedSchema.name} Schema</h2>
      <Form selectedSchema={selectedSchema} />
    </div>
    {!selectedRecord.id && <div>
      <h2>{selectedSchema.name} Records</h2>
      {records.map(record => <div onclick={[setSelectedRecord, record]}>
        {selectedRecord.id === record.id ? '-> ' + record.name : record.name}
      </div>)}
    </div>}
    {selectedRecord.id && <EditRecord selectedSchema={selectedSchema} selectedRecord={selectedRecord} />}
  </div>
}

function EditRecord({ selectedSchema, selectedRecord }) {
  return <div>
    <h2>Edit "{selectedRecord.name}" Record</h2>
    <Form selectedSchema={selectedSchema} selectedRecord={selectedRecord} />
  </div>
}

function Form({ selectedSchema, selectedRecord = {} }) {
  return <form>
    <fieldset>       
      {Object.keys(selectedSchema.properties).map(prop => <Field id={prop} type={selectedSchema.properties[prop]} value={selectedRecord[prop]} />)}
    </fieldset>
  </form>
}

function Field({ id, type, value }) {
  // const field = typeof type === 'string' ? { type } : type
  const primitives = ['bool','int','float','double','string','data','date']
  const isPrimitive = primitives.indexOf(type) > -1

  return <div>
    <input type="text" placeholder={id + ' ' + type} value={value} />
  </div>
}

app({
  init: {
    selectedSchema: {},
    selectedRecord: {},
    schemas: [],
    records: {}
  },
  view: state => App(state),
  node: document.getElementById("app")
})