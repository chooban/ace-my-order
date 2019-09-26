/// <reference path="../typings/ace-my-order.d.ts" />

import React, {createContext, useContext, useReducer, Dispatch} from 'react'

import { PreviewsItem } from 'ace-my-order'

const initialState = {
  order: [] as PreviewsItem[]
}

enum OrderActionType {
  Add = 'add',
  Remove = 'remove'
}

interface Action {
  type: OrderActionType,
  payload: PreviewsItem
}

type OrderState = typeof initialState

const orderReducer = (state: OrderState, action: Action): OrderState => {
  switch(action.type) {
    case 'add':
      return {
        order: [ ...state.order, action.payload ]
      }
    case 'remove':
      return {
        order: state.order.filter((a) => a.code !== action.payload.code)
      }
    default:
      return state
  }
}

interface StateProviderProps {
  children: React.ReactNode
}

const StateContext  = createContext<[OrderState, Dispatch<Action>]>([initialState, () => {}])

const OrderProvider = ({children}: StateProviderProps) => (
  <StateContext.Provider value={useReducer(orderReducer, initialState)}>
    {children}
  </StateContext.Provider>
)

const useOrder = () => useContext(StateContext)

export {
  OrderProvider,
  OrderActionType,
  useOrder
}
