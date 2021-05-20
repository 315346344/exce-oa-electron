import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import Router from './router/Router'
import { AppStateProvider } from './AppState'
// antDesgin 国际化
import { ConfigProvider } from 'antd'
import zhCN from 'antd/lib/locale/zh_CN'

ReactDOM.render(
  <ConfigProvider locale={zhCN}>
    <AppStateProvider>
      <Router />
    </AppStateProvider>
  </ConfigProvider>,

  document.getElementById('root'),
)
