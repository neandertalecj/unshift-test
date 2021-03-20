import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunkMibbleware from 'redux-thunk'
import usersReducer from './postsReducer'

const rootReducer = combineReducers({
  usersPage: usersReducer,
})

type RootReducerType = typeof rootReducer
export type AppStateType = ReturnType<RootReducerType>

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMibbleware)))

// @ts-ignore
window.__store__ = store

export default store
