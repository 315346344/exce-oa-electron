import React, { useRef } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import styles from './ChatPage.module.css'
import { Chat } from '../../components'
import { useHistory } from 'react-router-dom'

import avatar from '../../assets/chat-avatar.png'
import aduitAvatar from '../../assets/aduitColor.png'

import { SearchOutlined } from '@ant-design/icons'
import { Tabs, Input } from 'antd'

const listData = [
  {
    id: '01',
    img: avatar,
    name: '柏京',
    text: '欢迎使用本应用',
    time: '13:11',
    type: 'normal',
  },
  {
    id: '02',
    img: avatar,
    name: '柏京',
    text: '欢迎使用本应用',
    time: '13:11',
    type: 'normal',
  },
  {
    id: '03',
    img: aduitAvatar,
    name: '审批',
    text: '张三提交的请假需要您审批',
    time: '13:11',
    type: 'auditCard',
  },
]

export const ChatPage: React.FC = () => {
  const history = useHistory()
  const listRef = useRef<any>(null)

  const listShow = (index, item, history) => {
    Array.from(listRef.current.children).forEach((v: any, i) => {
      if (i === index) {
        v.className = `${styles.list} ${styles.chatPageShow}`
      } else {
        v.className = `${styles.list}`
      }
    })

    if (item.type === 'auditCard') {
      history.push('/chat/auditCard')
    } else {
      history.push('/chat/' + item.id)
    }
  }
  return (
    <div className={styles.ChatPageBox}>
      <div className={styles.left}>
        <Input placeholder="搜索" className={styles.search} prefix={<SearchOutlined />} />
        <div className={styles.group} ref={listRef}>
          {listData.map((item, index) => {
            return (
              <div
                className={styles.list}
                key={index}
                onClick={() => {
                  listShow(index, item, history)
                }}
              >
                <img src={item.img} className={styles.avatar} />
                <div className={styles.data}>
                  <div>{item.name}</div>
                  <div style={{ fontSize: '12px', color: '#999999' }}>{item.text}</div>
                </div>
                <div className={styles.time}>{item.time}</div>
              </div>
            )
          })}
        </div>
      </div>

      {/* <div className={styles.center}>
        <Switch>
          <Route path="/addressList/:personnelListId" component={PersonnelList} />
          <Redirect from="/addressList" to="/addressList/01/01" />
        </Switch>
      </div> */}

      <div className={styles.right}>
        <Switch>
          <Route path="/chat/:userId" component={Chat} />
          <Redirect from="/chat" to="/chat/01" />
        </Switch>
      </div>
    </div>
  )
}
