/**
 * 打卡报表模块
 */
import React, { useState, useEffect } from 'react'
import styles from './CheckInForm.module.css'
import { Picker } from '../../components'

import { Table } from 'antd'

// table设置
const columns: any = [
  {
    title: '姓名',
    dataIndex: 'name',
  },
  {
    title: '部门',
    dataIndex: 'department',
    filters: [
      {
        text: '研发部',
        value: '研发部',
      },
      {
        text: '人事部',
        value: '人事部',
      },
    ],
    onFilter: (value, record) => record.department.indexOf(value) === 0,
  },
  {
    title: '迟到',
    dataIndex: 'late',
  },
  {
    title: '早退',
    dataIndex: 'early',
  },
  {
    title: '缺卡',
    dataIndex: 'lack',
  },
  {
    title: '旷工',
    dataIndex: 'absenteeism',
  },
]
// table数据源
const data = [
  {
    key: '1',
    name: '张三',
    department: '研发部',
    late: '2次12分钟',
    early: '1次3分钟',
    lack: '无',
    absenteeism: '无',
  },
  {
    key: '2',
    name: '李四',
    department: '研发部',
    late: '无',
    early: '1次23分钟',
    lack: '1次',
    absenteeism: '无',
  },
  {
    key: '3',
    name: '王五',
    department: '人事部',
    late: '1次12分钟',
    early: '2次13分钟',
    lack: '无',
    absenteeism: '无',
  },
  {
    key: '4',
    name: '张三',
    department: '研发部',
    late: '2次12分钟',
    early: '1次3分钟',
    lack: '无',
    absenteeism: '无',
  },
  {
    key: '5',
    name: '李四',
    department: '研发部',
    late: '无',
    early: '1次23分钟',
    lack: '1次',
    absenteeism: '无',
  },
  {
    key: '6',
    name: '王五',
    department: '人事部',
    late: '1次12分钟',
    early: '2次13分钟',
    lack: '无',
    absenteeism: '无',
  },
  {
    key: '7',
    name: '李四',
    department: '研发部',
    late: '无',
    early: '1次23分钟',
    lack: '1次',
    absenteeism: '无',
  },
  {
    key: '8',
    name: '王五',
    department: '人事部',
    late: '1次12分钟',
    early: '2次13分钟',
    lack: '无',
    absenteeism: '无',
  },
  {
    key: '9',
    name: '王五',
    department: '人事部',
    late: '1次12分钟',
    early: '2次13分钟',
    lack: '无',
    absenteeism: '无',
  },
  {
    key: '10',
    name: '李四',
    department: '研发部',
    late: '无',
    early: '1次23分钟',
    lack: '1次',
    absenteeism: '无',
  },
  {
    key: '11',
    name: 'End',
    department: '人事部',
    late: '1次12分钟',
    early: '2次13分钟',
    lack: '无',
    absenteeism: '无',
  },
  {
    key: '12',
    name: '王五',
    department: '人事部',
    late: '1次12分钟',
    early: '2次13分钟',
    lack: '无',
    absenteeism: '无',
  },
  {
    key: '13',
    name: '李四',
    department: '研发部',
    late: '无',
    early: '1次23分钟',
    lack: '1次',
    absenteeism: '无',
  },
  {
    key: '14',
    name: 'End',
    department: '人事部',
    late: '1次12分钟',
    early: '2次13分钟',
    lack: '无',
    absenteeism: '无',
  },
  {
    key: '15',
    name: '王五',
    department: '人事部',
    late: '1次12分钟',
    early: '2次13分钟',
    lack: '无',
    absenteeism: '无',
  },
  {
    key: '16',
    name: '李四',
    department: '研发部',
    late: '无',
    early: '1次23分钟',
    lack: '1次',
    absenteeism: '无',
  },
  {
    key: '17',
    name: 'End',
    department: '人事部',
    late: '1次12分钟',
    early: '2次13分钟',
    lack: '无',
    absenteeism: '无',
  },

  {
    key: '18',
    name: '王五',
    department: '人事部',
    late: '1次12分钟',
    early: '2次13分钟',
    lack: '无',
    absenteeism: '无',
  },
  {
    key: '19',
    name: '李四',
    department: '研发部',
    late: '无',
    early: '1次23分钟',
    lack: '1次',
    absenteeism: '无',
  },
  {
    key: '20',
    name: 'End',
    department: '人事部',
    late: '1次12分钟',
    early: '2次13分钟',
    lack: '无',
    absenteeism: '无',
  },
]

export const CheckInForm: React.FC = () => {
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
