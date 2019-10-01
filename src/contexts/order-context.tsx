/// <reference path="../typings/ace-my-order.d.ts" />

import React, { createContext, useContext, useReducer, useEffect, Dispatch } from 'react'

import { PreviewsItem } from 'ace-my-order'

const state = {
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

type OrderState = typeof state

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
  initialState: OrderState,
  onUpdate: any,
  children: React.ReactNode
}

const StateContext = createContext<[OrderState, Dispatch<Action>]>([state, () => {}])

const OrderProvider = ({ children, initialState, onUpdate }: StateProviderProps) => {
  const [state, dispatch] = useReducer(orderReducer, initialState)

  useEffect(() => {
    onUpdate(state)
  }, [onUpdate, state])

  return (
    <StateContext.Provider value={[state, dispatch]}>
      {children}
    </StateContext.Provider>
  )
}

const useOrder = () => useContext(StateContext)

export {
  OrderProvider,
  OrderActionType,
  useOrder
}
