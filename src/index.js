// This file is just for exporting infrastructure to applications built upon this.
import * as ServerConfig from "./server/config"
export { ServerConfig }

export { default as createExpressServer } from "./server/createExpressServer"
export { default as createUniversalMiddleware } from "./server/createUniversalMiddleware"
export { default as addFallbackHandler } from "./server/addFallbackHandler"
export { default as renderPage } from "./server/renderPage"
export { createReduxStore, emptyReducer, emptyMiddleware, emptyEnhancer } from "./app/Data"
