import React, {createContext, useContext, useReducer, Dispatch} from 'react'

interface OrderState {
  order: string[]
}

enum OrderActionType {
  Add = 'add',
  Remove = 'remove'
}

interface Action {
  type: OrderActionType,
  payload: any
}

const orderReducer = (state: OrderState, action: Action): OrderState => {
  switch(action.type) {
    case 'add':
      return {
        order: [ ...state.order, 'hello' ]
      }
    case 'remove':
      return {
        order: []
      }
    default:
      return state
  }
}

interface StateProviderProps {
  children: React.ReactNode
}

const StateContext  = createContext<[Partial<OrderState>, Dispatch<Action>]>([{}, () => {}])

const OrderProvider = ({children}: StateProviderProps) => (
  <StateContext.Provider value={useReducer(orderReducer, { order: []})}>
    {children}
  </StateContext.Provider>
)

const useOrder = () => useContext(StateContext)

export {
  OrderProvider,
  OrderActionType,
  useOrder
}
