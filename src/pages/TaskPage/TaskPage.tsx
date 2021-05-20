/**
 * 任务页面
 */
import React, { useRef } from 'react'
import styles from './TaskPage.module.css'

import { Switch, Route, Redirect, useHistory } from 'react-router-dom'
import { Progress, Divider } from 'antd'
import { Task } from '../../components'

const titleArr = [
  {
    title: '项目1',
    rate: 20,
  },
  {
    title: '项目2',
    rate: 0,
  },
  {
    title: '项目3',
    rate: 60,
  },
  {
    title: '项目4',
    rate: 25,
  },
]

export const TaskPage: React.FC = () => {
  const history = useHistory()
  const tapEL = useRef<any>(null)

  // 点击项目列表某一项
  const clickTap = index => {
    Array.from(tapEL.current.children).map((item: any, count) => {
      if (index === count) {
        item.children[0].className = styles.list + ' taskShow'
        history.push('/task' + '/' + item.className)
      } else {
        item.children[0].className = styles.list
      }
    })
  }

  return (
    <div className={styles.taskPageBox}>
      <div className={styles.left}>
        <div className={styles.ul} ref={tapEL}>
          {titleArr.map((item, index) => {
            return (
              <div key={index} className={item.title}>
                <div
                  className={styles.list}
                  onClick={() => {
                    clickTap(index)
                  }}
                >
                  <div className={styles.title}>
                    <span>{item.title}</span>
                    <span style={{ fontWeight: 'bolder' }}>...</span>
                  </div>
                  <Progress className={styles.rate} percent={item.rate} />
                </div>
                <Divider />
              </div>
            )
          })}
        </div>
      </div>

      <div className={styles.right}>
        <Switch>
          <Route path="/task" component={Task} />

          {/* <Redirect from="/audit" to="/audit/0" /> */}
        </Switch>
      </div>
    </div>
  )
}
