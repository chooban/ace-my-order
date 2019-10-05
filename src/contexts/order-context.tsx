/// <reference path="../typings/ace-my-order.d.ts" />

import { PreviewsItem } from 'ace-my-order'
import React, { createContext, Dispatch,useContext } from 'react'
import { useLocalStorageReducer } from 'react-storage-hooks'

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

interface OrderProviderProps {
  children: React.ReactNode
}

const OrderContext = createContext<[OrderState, Dispatch<Action>]>([initialState, () => {}])

const OrderProvider = ({ children }: OrderProviderProps) => {
  const [order, dispatch] = useLocalStorageReducer('order', orderReducer, initialState)

  return (
    <OrderContext.Provider value={[order, dispatch]}>
      {children}
    </OrderContext.Provider>
  )
}

const useOrder = () => useContext(OrderContext)

export {
  OrderProvider,
  OrderActionType,
  useOrder
}
