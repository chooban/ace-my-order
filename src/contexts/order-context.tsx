import React, { createContext, useContext } from 'react'
import { useLocalStorageReducer } from 'react-storage-hooks'

const initialState = {
  order: [] as ReadonlyArray<PreviewsItem>
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
  const { order } = state
  switch(action.type) {
    case 'add':
      return {
        order: [ ...order, action.payload ]
      }
    case 'remove':
      const idx = order.findIndex((a) => a.code === action.payload.code)

      if (idx < 0) {
        console.warn(`Tried to remove an item I couldn't find: ${action.payload.code}`)
        return state
      }

      const newOrder = [ ...order ]
      newOrder.splice(idx, 1)
      return {
        order: newOrder
      }
    default:
      return state
  }
}

interface OrderProviderProps {
  children: React.ReactNode
}

interface OrderContextActions {
  addToOrder: (i: PreviewsItem) => void,
  removeFromOrder: (i: PreviewsItem) => void
}

const OrderContext = createContext<[OrderState, OrderContextActions]>([initialState, {
  addToOrder: () => null,
  removeFromOrder: () => null
}])

const OrderProvider = ({ children }: OrderProviderProps) => {
  const [order, dispatch] = useLocalStorageReducer('order', orderReducer, initialState)

  const actions: OrderContextActions = {
    addToOrder: (i) => dispatch({ type: OrderActionType.Add, payload: i }),
    removeFromOrder: (i) => dispatch({ type: OrderActionType.Remove, payload: i })
  }

  return (
    <OrderContext.Provider value={[order, actions]}>
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
