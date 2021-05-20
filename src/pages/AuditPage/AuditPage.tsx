/**
 * 请假审批页面
 */
import React, { useRef } from 'react'
import { Switch, Route, Redirect, useHistory } from 'react-router-dom'
import styles from './AuditPage.module.css'

import {
  LeaveTap,
  EvectionTap,
  OvertimeTap,
  GoOutTap,
  ProcurementTap,
  ReimbursementTap,
  ReissueCardTap,
} from '../../components'

import img1 from '../../assets/audit1.png'
import img2 from '../../assets/audit2.png'
import img3 from '../../assets/audit3.png'
import img4 from '../../assets/audit4.png'
import img5 from '../../assets/audit5.png'
import img6 from '../../assets/audit6.png'
import img7 from '../../assets/audit7.png'

const titleArr = [
  {
    title: '请假',
    url: img1,
  },
  {
    title: '出差',
    url: img2,
  },
  {
    title: '加班',
    url: img3,
  },
  {
    title: '外出',
    url: img4,
  },
  {
    title: '采购',
    url: img5,
  },
  {
    title: '报销',
    url: img6,
  },
  {
    title: '补卡',
    url: img7,
  },
]

export const AuditPage: React.FC = () => {
  const history = useHistory()
  const tapEL = useRef<any>(null)

  const clickTap = data => {
    Array.from(tapEL.current.children).map((item: any, index) => {
      history.push('/audit' + '/' + data)
      if (data === index) {
        item.className = styles.list + ' auditShow'
      } else {
        item.className = styles.list
      }
    })
  }
  return (
    <div className={styles.AuditPageBox}>
      <div className={styles.left}>
        <div className={styles.title}>审批类型</div>
        <div className={styles.ul} ref={tapEL}>
          {titleArr.map((item, index) => {
            if (index === 0) {
              return (
                <div
                  className={styles.list + ' clockingInShow'}
                  key={index}
                  onClick={() => {
                    clickTap(index)
                  }}
                >
                  <img src={item.url} className={styles.img} alt="" />
                  <span>{item.title}</span>
                </div>
              )
            } else {
              return (
                <div
                  className={styles.list}
                  key={index}
                  onClick={() => {
                    clickTap(index)
                  }}
                >
                  <img src={item.url} className={styles.img} alt="" />
                  <span>{item.title}</span>
                </div>
              )
            }
          })}
        </div>
      </div>

      <div className={styles.right}>
        <Switch>
          <Route path="/audit/0" component={LeaveTap} />
          <Route path="/audit/1" component={EvectionTap} />
          <Route path="/audit/2" component={OvertimeTap} />
          <Route path="/audit/3" component={GoOutTap} />
          <Route path="/audit/4" component={ProcurementTap} />
          <Route path="/audit/5" component={ReimbursementTap} />
          <Route path="/audit/6" component={ReissueCardTap} />

          <Redirect from="/audit" to="/audit/0" />
        </Switch>
      </div>
    </div>
  )
}
