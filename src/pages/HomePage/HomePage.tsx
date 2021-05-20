import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import styles from './HomePage.module.css'
import 'antd/dist/antd.css'
import { LeftNavBar } from '../../components'

import max from '../../assets/max.png'
import min from '../../assets/min.png'
import cls from '../../assets/cls.png'

const ipc = window.require('electron').ipcRenderer

// 关闭app
const closeApp = () => {
  ipc.send('close-app')
}
// 最小化app
const minApp = () => {
  ipc.send('min-app')
}
// 最大化app
const maxApp = () => {
  ipc.send('max-app')
}

export const HomePage: React.FC = props => {
  return (
    <div className={styles.content}>
      <LeftNavBar />
      <div className={styles.rightBox}>
        <div className={styles.line}>
          <div className={styles.winOpera}>
            <img
              src={min}
              style={{ padding: '0 12px' }}
              className={styles.operaImg}
              onClick={minApp}
            />

            <img
              src={max}
              style={{ padding: '0 12px' }}
              className={styles.operaImg}
              onClick={maxApp}
            />

            <img
              src={cls}
              style={{ padding: '0 20px 0 10px' }}
              className={styles.operaImg}
              onClick={closeApp}
            />
          </div>
        </div>
        <div className={styles.route}>{props.children}</div>
      </div>
    </div>
  )
}
