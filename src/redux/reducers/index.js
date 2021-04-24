import { combineReducers } from 'redux'
import main from './main'

const rootReducer = combineReducers({
    all: main
})

export default rootReducer
