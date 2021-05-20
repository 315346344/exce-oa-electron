import React from 'react'
import styles from './PersonnelDetail.module.css'
import avatar from '../../assets/avatar-big.png'
import { Button } from 'antd'

const dataArray = [
  {
    type: '手机',
    value: '17717123456',
  },
  {
    type: '部门',
    value: '研发',
  },
  {
    type: '邮箱',
    value: '315346344@qq.com',
  },
]
export const PersonnelDetail: React.FC = () => {
  return (
    <div className={styles.box}>
      <div className={styles.avatar}>
        <img src={avatar} alt="" />
        <span className={styles.text}>柏京</span>
      </div>

      <div className={styles.line}></div>

      {dataArray.map((item, index) => {
        return (
          <div className={styles.list} key={index}>
            <span className={styles.listLeft}>{item.type}</span>
            <span className={styles.listRight}>{item.value}</span>
          </div>
        )
      })}

      <Button className={styles.btn} type="primary">
        发消息
      </Button>
    </div>
  )
}
