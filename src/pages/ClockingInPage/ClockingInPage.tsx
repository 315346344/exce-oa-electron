/**
 * 打卡报表页面
 */
import React, { useRef } from 'react'
import styles from './ClockingInPage.module.css'
import { Switch, Route, Redirect, useHistory } from 'react-router-dom'
import { CheckInForm, SignInForm } from '../../components'

import img1 from '../../assets/clockingin1.png'
import img2 from '../../assets/clockingin2.png'

export const ClockingInPage: React.FC = () => {
  const history = useHistory()
  const tapEL1 = useRef<any>(null)
  const tapEL2 = useRef<any>(null)

  const clickTap = id => {
    if (id === 1) {
      tapEL1.current.className = styles.list + ' clockingInShow'
      tapEL2.current.className = styles.list
      history.push('/clockingIn/1')
    } else if (id === 2) {
      tapEL2.current.className = styles.list + ' clockingInShow'
      tapEL1.current.className = styles.list
      history.push('/clockingIn/2')
    }
  }
  return (
    <div className={styles.box}>
      <div className={styles.left}>
        <div className={styles.title}>报表类型</div>
        <div className={styles.ul}>
          <div
            className={styles.list + ' clockingInShow'}
            ref={tapEL1}
            onClick={() => {
              clickTap(1)
            }}
          >
            <img src={img1} className={styles.img} alt="" />
            <span>打卡报表</span>
          </div>
          <div
            className={styles.list}
            ref={tapEL2}
            onClick={() => {
              clickTap(2)
            }}
          >
            <img src={img2} className={styles.img} alt="" />
            <span>签到报表</span>
          </div>
        </div>
      </div>

      <div className={styles.right}>
        <Switch>
          <Route path="/clockingIn/1" component={CheckInForm} />
          <Route path="/clockingIn/2" component={SignInForm} />
          <Redirect from="/clockingIn" to="/clockingIn/1" />
        </Switch>
      </div>
    </div>
  )
}
