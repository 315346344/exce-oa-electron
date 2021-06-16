/**
 * 项目页面
 */
import React, { useRef } from 'react'
import styles from './ProjectPage.module.css'

import { Switch, Route, Redirect, useHistory } from 'react-router-dom'
import { Progress, Divider } from 'antd'
import { Project, AddProjectModal } from '../../components'

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

export const ProjectPage: React.FC = () => {
  const history = useHistory()
  const tapEL = useRef<any>(null)
  const childrenRef = useRef<any>(null)

  // 点击项目列表某一项
  const clickTap = index => {
    Array.from(tapEL.current.children).map((item: any, count) => {
      if (index === count) {
        item.children[0].className = styles.list + ' projectShow'
        history.push('/home/project' + '/' + item.className)
      } else {
        item.children[0].className = styles.list
      }
    })
  }
  // 模态框打开
  const showModal = () => childrenRef.current.showModal()

  return (
    <div className={styles.projectPageBox}>
      <div className={styles.left}>
        <button className={styles.addProject} onClick={showModal}>
          新建项目
        </button>
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
          <Route path="/home/project" component={Project} />

          {/* <Redirect from="/audit" to="/audit/0" /> */}
        </Switch>
      </div>

      <AddProjectModal ref={childrenRef} />
    </div>
  )
}
