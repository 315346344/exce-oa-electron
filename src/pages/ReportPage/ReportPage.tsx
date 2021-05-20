import React, { useRef } from 'react'
import { Switch, Route, Redirect, useHistory } from 'react-router-dom'
import styles from './ReportPage.module.css'

import { ReportWrite, ReportExamine } from '../../components'

import img1 from '../../assets/report1.png'
import img2 from '../../assets/report2.png'

const titleArr = [
  {
    title: '写汇报',
    url: img1,
  },
  {
    title: '汇报记录',
    url: img2,
  },
]

export const ReportPage: React.FC = () => {
  const history = useHistory()
  const tapEL = useRef<any>(null)

  const clickTap = data => {
    Array.from(tapEL.current.children).map((item: any, index) => {
      history.push('/report' + '/' + data)
      if (data === index) {
        item.className = styles.list + ' auditShow'
      } else {
        item.className = styles.list
      }
    })
  }
  return (
    <div className={styles.ReportPageBox}>
      <div className={styles.left}>
        <div className={styles.title}>汇报类型</div>
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
          <Route path="/report/0" component={ReportWrite} />
          <Route path="/report/1" component={ReportExamine} />

          <Redirect from="/report" to="/report/0" />
        </Switch>
      </div>
    </div>
  )
}
