import React, { createContext, useCallback, useContext } from 'react'
import { useStorageReducer } from 'react-storage-hooks'

import { AceItem } from '../../typings/autogen'

type ActionHandler = (action: Action, state: OrderState) => OrderState
type SwitchHandler = ActionHandler | OrderState

const switchcase = (cases: Record<OrderActionType, SwitchHandler>) => (defaultCase: SwitchHandler) => (key: OrderActionType) =>
  Object.prototype.hasOwnProperty.call(cases, key) ? cases[key] : defaultCase

const executeIfFunction = (f: Function|any) =>
  f instanceof Function ? f() : f

const switchcaseF = (cases: Record<OrderActionType, SwitchHandler>) => (defaultCase: SwitchHandler) => (key: OrderActionType) =>
  executeIfFunction(switchcase(cases)(defaultCase)(key))

const initialState = {
  order: [] as ReadonlyArray<AceItem>
}

enum OrderActionType {
  Add = 'add',
  Remove = 'remove'
}

interface Action {
  type: OrderActionType,
  payload: AceItem
}

type OrderState = typeof initialState

const removeActionHandler = (action: Action, state: OrderState): OrderState => {
  const { order } = state
  const idx = order.findIndex((a) => a.previewsCode === action.payload.previewsCode)
  if (idx < 0) {
    console.warn(`Tried to remove an item I couldn't find: ${action.payload.previewsCode}`)
    return state
  }

  const newOrder = [ ...order ]
  newOrder.splice(idx, 1)
  return {
    order: newOrder
  }
}

const addActionHandler = (action: Action, state: OrderState): OrderState => {
  console.log('Adding to order', { p: action.payload })
  const { order } = state
  return {
    order: [ ...order, action.payload ]
  }
}

const orderReducer = (state: OrderState, action: Action): OrderState => {
  return switchcaseF({
    'add': () => addActionHandler(action, state),
    'remove': () => removeActionHandler(action, state)
  })(state)(action.type)
}

interface OrderProviderProps {
  children: React.ReactNode
}

interface OrderContextActions {
  addToOrder: (i: AceItem) => void,
  removeFromOrder: (i: AceItem) => void
}

const OrderContext = createContext<[OrderState, OrderContextActions]>([initialState, {
  addToOrder: () => null,
  removeFromOrder: () => null
}])

const OrderProvider = ({ children }: OrderProviderProps) => {
  const [order, dispatch] = useStorageReducer(localStorage, 'order', orderReducer, initialState)

  // Only bind the actions once
  const addToOrder = useCallback((i) => dispatch({ type: OrderActionType.Add, payload: i }), [dispatch])
  const removeFromOrder = useCallback((i) => dispatch({ type: OrderActionType.Remove, payload: i }), [dispatch])
  const valueFactory = useCallback(() => {
    return [order, { addToOrder, removeFromOrder }]
  }, [order, addToOrder, removeFromOrder])

  return (
    <OrderContext.Provider value={valueFactory() as [OrderState, OrderContextActions]}>
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
