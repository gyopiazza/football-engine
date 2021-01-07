import { createState, createContext, useContext } from "solid-js";
// import config from "./config";

const AppContext = createContext([
  {
    selectedSchema: {},
    selectedRecord: {},
    schemas: [],
    records: {}
  },
  {}
]);

export const AppProvider = (props) => {
  const [state, setState] = createState({
    selectedSchema: props.selectedSchema || {},
    selectedRecord: props.selectedRecord || {},
    schemas: props.schemas || [],
    records: props.records || {}
  });
  const store = [
    state,
    {
      cancelEditing() {
        setState(state => ({
          ...state,
          selectedSchema: {},
          selectedRecord: {}
        }))
      },
      loadData() {
        fetch('/api')
          .then(response => response.json())
          .then(response => setState(state => ({
            ...state,
            schemas: response.schemas,
            records: response.records
          })))
      },
      setState
    }
  ];

  return (
    <AppContext.Provider value={store}>{props.children}</AppContext.Provider>
  );
};

export function useState() {
  return useContext(AppContext);
}
