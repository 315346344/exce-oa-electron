/**
 * 此组件为人员列表
 * 联系人页面的第二级选择列表
 */
import React, { useRef, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import styles from './PersonnelList.module.css'
import avatar from './../../assets/avatar2.png'

import { appContext, appSetStateContext } from '../../AppState'

const dataArr = [
  {
    name: '张三',
    id: '01',
  },
  {
    name: '李四',
    id: '02',
  },
  {
    name: '王五五',
    id: '03',
  },
  {
    name: '赵六',
    id: '04',
  },
  {
    name: '田七七',
    id: '05',
  },
  {
    name: '张三',
    id: '06',
  },
  {
    name: '王五五',
    id: '07',
  },
  {
    name: '田七七',
    id: '08',
  },
  {
    name: '赵六',
    id: '09',
  },
  {
    name: '田七七',
    id: '010',
  },
  {
    name: '张三',
    id: '011',
  },
  {
    name: '王五五',
    id: '012',
  },
  {
    name: '王五五',
    id: '012',
  },

  {
    name: '王五五',
    id: '012',
  },
  {
    name: '王五五',
    id: '012',
  },

  {
    name: '王五五',
    id: '012',
  },
  {
    name: '王五五',
    id: '012',
  },

  {
    name: '王五五',
    id: '012',
  },

  {
    name: '王五五',
    id: '012',
  },
  {
    name: '王五五',
    id: '012',
  },

  {
    name: '王五五',
    id: '012',
  },
  {
    name: '王五五',
    id: '012',
  },
  {
    name: '王五五',
    id: '012',
  },
  {
    name: '王五五',
    id: '012',
  },

  {
    name: '王五五',
    id: '012',
  },

  {
    name: '王五五',
    id: '012',
  },

  {
    name: '王五五',
    id: '012',
  },

  {
    name: 'end',
    id: '012',
  },
]

export const PersonnelList: React.FC = () => {
  const value = useContext(appContext)
  const history = useHistory()
  const itemEL = useRef<any>(null)

  const checkItem = (id, index) => {
    // 清除所有icon的选中样式
    Array.from(itemEL.current.children).map((item: any, i) => {
      item.className = styles.list
    })

    // 点击icon的样式改动
    itemEL.current.children[index].className =
      styles.list + ' PersonnelListClick'

    // 跳转路由
    history.push('/home/addressList/' + value.addressListRouteId + '/' + id)
  }
  return (
    <div className={styles.box}>
      <div className={styles.title}>部门成员（888人）</div>
      <div className={styles.ul} ref={itemEL}>
        {dataArr.map((item, index) => {
          if (index === 0) {
            return (
              <div
                className={styles.list + ' PersonnelListClick'}
                key={index}
                onClick={() => {
                  checkItem(item.id, index)
                }}
              >
                <img className={styles.avatar} src={avatar}></img>
                <div className={styles.text}>{item.name}</div>
              </div>
            )
          } else {
            return (
              <div
                className={styles.list}
                key={index}
                onClick={() => {
                  checkItem(item.id, index)
                }}
              >
                <img className={styles.avatar} src={avatar}></img>
                <div className={styles.text}>{item.name}</div>
              </div>
            )
          }
        })}
      </div>
    </div>
  )
}
