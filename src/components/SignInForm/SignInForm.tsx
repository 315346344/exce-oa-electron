/**
 * 签到报表模块
 */
import React, { useState, useEffect } from 'react'
import styles from './SignInForm.module.css'
import { Picker } from '../../components'

import { Table } from 'antd'

// table设置
const columns: any = [
  {
    title: '姓名',
    dataIndex: 'name',
    width: 120,
  },
  {
    title: '日期',
    dataIndex: 'date',
    width: 120,
  },
  {
    title: '签到时间',
    dataIndex: 'signIn',
    width: 120,
  },
  {
    title: '签退时间',
    dataIndex: 'signOut',
    width: 120,
  },
  {
    title: '拜访目标',
    dataIndex: 'target',
    ellipsis: true,
  },
  {
    title: '签到地点',
    dataIndex: 'address',
    ellipsis: true,
  },
]
// table数据源
const data = [
  {
    key: '1',
    name: '张三',
    date: '01-01',
    signIn: '09:00',
    signOut: '11:23',
    target: '上海传慎医疗器材有限公司',
    address: '上海市长宁区延安西路1088号3106室',
  },
  {
    key: '2',
    name: '李四',
    date: '01-01',
    signIn: '09:00',
    signOut: '11:23',
    target: '上海传慎医疗器材有限公司',
    address: '上海市长宁区延安西路1088号3106室',
  },
  {
    key: '3',
    name: '王五',
    date: '01-01',
    signIn: '09:00',
    signOut: '11:23',
    target: '上海传慎医疗器材有限公司',
    address: '上海市长宁区延安西路1088号3106室',
  },
  {
    key: '4',
    name: '张三',
    date: '01-01',
    signIn: '09:00',
    signOut: '11:23',
    target: '上海传慎医疗器材有限公司',
    address: '上海市长宁区延安西路1088号3106室',
  },
  {
    key: '5',
    name: '李四',
    date: '01-01',
    signIn: '09:00',
    signOut: '11:23',
    target: '上海传慎医疗器材有限公司',
    address: '上海市长宁区延安西路1088号3106室',
  },
  {
    key: '6',
    name: '王五',
    date: '01-01',
    signIn: '09:00',
    signOut: '11:23',
    target: '上海传慎医疗器材有限公司',
    address: '上海市长宁区延安西路1088号3106室',
  },
  {
    key: '7',
    name: '李四',
    date: '01-01',
    signIn: '09:00',
    signOut: '11:23',
    target: '上海传慎医疗器材有限公司',
    address: '上海市长宁区延安西路1088号3106室',
  },
  {
    key: '8',
    name: '王五',
    date: '01-01',
    signIn: '09:00',
    signOut: '11:23',
    target: '上海传慎医疗器材有限公司',
    address: '上海市长宁区延安西路1088号3106室',
  },
  {
    key: '9',
    name: '王五',
    date: '01-01',
    signIn: '09:00',
    signOut: '11:23',
    target: '上海传慎医疗器材有限公司',
    address: '上海市长宁区延安西路1088号3106室',
  },
  {
    key: '10',
    name: '李四',
    date: '01-01',
    signIn: '09:00',
    signOut: '11:23',
    target: '上海传慎医疗器材有限公司',
    address: '上海市长宁区延安西路1088号3106室',
  },
  {
    key: '11',
    name: 'End',
    date: '01-01',
    signIn: '09:00',
    signOut: '11:23',
    target: '上海传慎医疗器材有限公司',
    address: '上海市长宁区延安西路1088号3106室',
  },
  {
    key: '12',
    name: '王五',
    date: '01-01',
    signIn: '09:00',
    signOut: '11:23',
    target: '上海传慎医疗器材有限公司',
    address: '上海市长宁区延安西路1088号3106室',
  },
  {
    key: '13',
    name: '李四',
    date: '01-01',
    signIn: '09:00',
    signOut: '11:23',
    target: '上海传慎医疗器材有限公司',
    address: '上海市长宁区延安西路1088号3106室',
  },
  {
    key: '14',
    name: 'End',
    date: '01-01',
    signIn: '09:00',
    signOut: '11:23',
    target: '上海传慎医疗器材有限公司',
    address: '上海市长宁区延安西路1088号3106室',
  },
  {
    key: '15',
    name: '王五',
    date: '01-01',
    signIn: '09:00',
    signOut: '11:23',
    target: '上海传慎医疗器材有限公司',
    address: '上海市长宁区延安西路1088号3106室',
  },
  {
    key: '16',
    name: '李四',
    date: '01-01',
    signIn: '09:00',
    signOut: '11:23',
    target: '上海传慎医疗器材有限公司',
    address: '上海市长宁区延安西路1088号3106室',
  },
  {
    key: '17',
    name: 'End',
    date: '01-01',
    signIn: '09:00',
    signOut: '11:23',
    target: '上海传慎医疗器材有限公司',
    address: '上海市长宁区延安西路1088号3106室',
  },

  {
    key: '18',
    name: '王五',
    date: '01-01',
    signIn: '09:00',
    signOut: '11:23',
    target: '上海传慎医疗器材有限公司',
    address: '上海市长宁区延安西路1088号3106室',
  },
  {
    key: '19',
    name: '李四',
    date: '01-01',
    signIn: '09:00',
    signOut: '11:23',
    target: '上海传慎医疗器材有限公司',
    address: '上海市长宁区延安西路1088号3106室',
  },
  {
    key: '20',
    name: 'End',
    date: '01-01',
    signIn: '09:00',
    signOut: '11:23',
    target: '上海传慎医疗器材有限公司',
    address: '上海市长宁区延安西路1088号3106室',
  },
]

export const SignInForm: React.FC = () => {
  // table自适应窗口大小高度
  let [tableHeight, setTableHeight] = useState<any>(544)

  const changeResize = () => {
    setTableHeight(document.documentElement.clientHeight - 80 - 55 - 24 + 'px')
  }
  useEffect(() => {
    window.addEventListener('resize', changeResize)
  })

  return (
    <div>
      <Picker />
      <div className={styles.body}>
        <Table
          columns={columns}
          dataSource={data}
          scroll={{ y: tableHeight }}
          pagination={false}
        />
      </div>
    </div>
  )
}
