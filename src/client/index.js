// eslint-disable filenames/match-exported
import React from "react"
import { render } from "react-dom"
import { BrowserRouter } from "react-router"
import { CodeSplitProvider, rehydrateState } from "code-split-component"
import { Provider } from "react-redux"
import "./registerServiceWorker"
import ReactHotLoader from "./ReactHotLoader"
import App from "../app/App"
import { createReduxStore } from "../app/Data"

// Get the DOM Element that will host our React application.
const container = document.querySelector("#app")

function renderApp(AppComponent)
{
  console.log("Client: Initialize state from server:", window.APP_STATE)

  const reduxStore = createReduxStore({
    reducers: App.getReducers(),
    enhancers: App.getEnhancers(),
    middlewares: App.getMiddlewares(),
    initialState: window.APP_STATE
  })

  // Firstly we ensure that we rehydrate any code split state provided to us
  // by the server response. This state typically indicates which bundles/chunks
  // need to be registered for our application to render and the React checksum
  // to match the server response.
  // @see https://github.com/ctrlplusb/code-split-component
  console.log("Client: Rehydrating code splitting state...")
  rehydrateState().then((codeSplitState) =>
  {
    console.log("Client: Code Splitting State:", codeSplitState ? codeSplitState.length : 0)
    return render(
      <ReactHotLoader>
        <CodeSplitProvider state={codeSplitState}>
          <BrowserRouter>
            <Provider store={reduxStore}>
              <AppComponent/>
            </Provider>
          </BrowserRouter>
        </CodeSplitProvider>
      </ReactHotLoader>,
      container
    )
  })
}

// The following is needed so that we can hot reload our App.
if (process.env.NODE_ENV === "development" && module.hot)
{
  // Accept changes to this file for hot reloading.
  module.hot.accept("./index.js")

  // Any changes to our App will cause a hotload re-render.
  module.hot.accept("../app/App", () => renderApp(require("../app/App").default))

  // Enable Webpack hot module replacement for reducers. This is so that we
  // don"t lose all of our current application state during hot reloading.
  /*
  module.hot.accept("../app/RootReducer", () =>
  {
    // eslint-disable global-require
    const nextRootReducer = require("../app/RootReducer").default
    store.replaceReducer(nextRootReducer)
  })
  */

    // The following is needed so that we can hot reload our App.
  if (process.env.NODE_ENV === "development" && module.hot) {
    // Enable Webpack hot module replacement for reducers. This is so that we
    // don't lose all of our current application state during hot reloading.
    /*
    module.hot.accept("./Data", () => {
      const nextRootReducer = require("./Data").default // eslint-disable-line global-require
      store.replaceReducer(nextRootReducer)
    })
    */
  }
}

renderApp(App)
