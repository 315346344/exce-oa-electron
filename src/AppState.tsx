/**
 * 此为useContext组件
 * 用于管理全局数据
 * addressListRouteId: 为联系人页面的二级组件id，用于页面跳转
 */
import React, { useState } from 'react'

interface AppStateValue {
  addressListRouteId: string
}

const defaultContextValue: AppStateValue = {
  addressListRouteId: '01',
}

export const appContext = React.createContext(defaultContextValue)
export const appSetStateContext =
  React.createContext<React.Dispatch<React.SetStateAction<AppStateValue>> | undefined>(
    undefined,
  )

export const AppStateProvider: React.FC = props => {
  const [state, setState] = useState(defaultContextValue)

  return (
    <appContext.Provider value={state}>
      <appSetStateContext.Provider value={setState}>
        {props.children}
      </appSetStateContext.Provider>
    </appContext.Provider>
  )
}
