/**
 * 任务模块组件
 */
import React, { useState, useEffect } from 'react'
import styles from './Task.module.css'

import { Tabs, Table, Button, Space, Tag } from 'antd'
import type { ProColumns } from '@ant-design/pro-table'
import { EditableProTable } from '@ant-design/pro-table'
import '@ant-design/pro-table/dist/table.css'

// 标签页相关
const { TabPane } = Tabs
function callback(key) {
  // console.log(key)
}

const waitTime = (time: number = 100) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(true)
    }, time)
  })
}

// table tree
type DataSourceType = {
  id: React.Key
  title?: string
  principal?: string
  state?: string
  time?: string
  children?: DataSourceType[]
}

const defaultData = [
  {
    id: 624748504,
    title:
      '活动名称一活动名称一活动名称一活动名称一活动名称一活动名称一活动名称一',
    name:
      '测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试',
    principal: 'zhangsan',
    state: 'open',
    time: '2020-05-26',
  },
  {
    id: 624691229,
    title:
      '活动名称二活动名称二活动名称二活动名称二活动名称二活动名称二活动名称二活动名称二活动名称二',
    name: '测试测试测试测试测试测试测试测试测试测试测试测试测试测试',
    principal: 'lisi',
    state: 'closed',
    time: '2020-07-26',
  },
  {
    id: 624691239,
    name:
      '测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试',
    title:
      '活动名称三活动名称三活动名称三活动名称三活动名称三活动名称三活动名称三活动名称三活动名称三活动名称三活动名称三活动名称三',
    principal: 'wangwu',
    state: 'all',
    time: '2020-12-26',
  },
]

export const Task: React.FC = () => {
  // 任务列表相关
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([])
  const [dataSource, setDataSource] = useState<DataSourceType[]>([])
  const [position, setPosition] = useState<'top' | 'bottom' | 'hidden'>(
    'hidden',
  )
  const [newRecord, setNewRecord] = useState({
    id: (Math.random() * 1000000).toFixed(0),
  })

  // 表格
  const columns1: ProColumns<DataSourceType>[] = [
    {
      title: '任务名称',
      dataIndex: 'name',
      key: 'name',
      ellipsis: true,
      // render: text => <a>{text}</a>,
    },
    {
      title: '操作',
      key: 'operation',
      width: '20%',
      render: () => (
        <>
          <Button
            type="primary"
            size="small"
            style={{ borderRadius: '3px', width: '52px', height: '24px' }}
            onClick={() => {
              alert('完成按钮')
            }}
          >
            完成
          </Button>
          {/* <a
            key="editable"
            onClick={() => {
              alert('完成按钮')
            }}
          >
            完成
          </a> */}
        </>
      ),
    },
  ]
  const columns2: ProColumns<DataSourceType>[] = [
    {
      title: '任务名称',
      dataIndex: 'name',
      key: 'name',
      ellipsis: true,
      // render: text => <a>{text}</a>,
    },
    {
      title: '截止时间',
      dataIndex: 'time',
      key: 'time',
      width: '20%',
      ellipsis: true,
      // render: text => <a>{text}</a>,
    },
    // {
    //   title: '操作',
    //   key: 'operation',
    //   width: '20%',
    //   render: () => (
    //     <>
    //       <Button
    //         type="primary"
    //         size="small"
    //         style={{ borderRadius: '3px', width: '52px', height: '24px' }}
    //         onClick={() => {
    //           alert('完成按钮')
    //         }}
    //       >
    //         完成
    //       </Button>
    //     </>
    //   ),
    // },
    {
      title: '状态',
      key: 'state',
      width: '20%',
      dataIndex: 'state',
      valueType: 'select',
      valueEnum: {
        all: { text: '进行中', status: 'Default' },
        open: {
          text: '未完成',
          status: 'Error',
        },
        closed: {
          text: '已完成',
          status: 'Success',
        },
      },
    },
  ]
  const columns3: ProColumns<DataSourceType>[] = [
    {
      title: '任务名称',
      dataIndex: 'title',
      ellipsis: true,
      formItemProps: (form, { rowIndex }) => {
        return {
          rules:
            rowIndex > 2 ? [{ required: true, message: '此项为必填项' }] : [],
        }
      },
      // 第二行不允许编辑
      // editable: (text, record, index) => {
      //   return index !== 0
      // },
      width: '30%',
    },

    {
      width: '2%',
    },
    {
      title: '负责人',
      dataIndex: 'principal',
      valueType: 'select',
      valueEnum: {
        zhangsan: { text: '张三' },
        lisi: { text: '李四' },
        wangwu: { text: '王五' },
      },
    },
    {
      title: '截止时间',
      dataIndex: 'time',
      valueType: 'date',
    },
    {
      title: '状态',
      key: 'state',
      dataIndex: 'state',
      valueType: 'select',
      valueEnum: {
        all: { text: '进行中', status: 'Default' },
        open: {
          text: '未完成',
          status: 'Error',
        },
        closed: {
          text: '已完成',
          status: 'Success',
        },
      },
    },
    {
      title: '操作',
      valueType: 'option',
      width: 200,
      render: (text, record, _, action) => [
        <a
          key="editable"
          onClick={() => {
            action?.startEditable?.(record.id)
          }}
        >
          编辑
        </a>,
        <a
          key="delete"
          onClick={() => {
            setDataSource(dataSource.filter(item => item.id !== record.id))
          }}
        >
          删除
        </a>,
      ],
    },
  ]

  // from自适应窗口大小高度
  let [formHeight, setformHeight] = useState<any>(605)
  const changeResize = () => {
    setformHeight(document.documentElement.clientHeight - 24 - 46)
  }
  useEffect(() => {
    window.addEventListener('resize', changeResize)
  }, [])

  return (
    <div className={styles.taskBox}>
      <Tabs defaultActiveKey="1" onChange={callback}>
        <TabPane
          style={{ height: formHeight }}
          className={styles.tabPane1}
          tab="进行中"
          key="1"
        >
          {/* <div>
            <Table columns={columns1} dataSource={defaultData} pagination={false} />
          </div> */}
          <>
            <EditableProTable<DataSourceType>
              rowKey="id"
              // headerTitle="可编辑表格"
              maxLength={999}
              recordCreatorProps={
                position !== 'hidden'
                  ? {
                      position: position as 'top',
                      record: newRecord,
                    }
                  : false
              }
              columns={columns1}
              request={async () => ({
                data: defaultData,
                total: 3,
                success: true,
              })}
              value={dataSource}
              onChange={setDataSource}
              editable={{
                type: 'single',
                editableKeys,
                onSave: async () => {
                  await waitTime(2000)
                  setNewRecord({
                    id: (Math.random() * 1000000).toFixed(0),
                  })
                },
                onChange: setEditableRowKeys,
              }}
            />
          </>
        </TabPane>

        <TabPane
          className={styles.tabPane2}
          style={{ height: formHeight }}
          tab="已结束"
          key="2"
        >
          {/* <div>
            <Table columns={columns2} dataSource={defaultData} pagination={false} />
          </div> */}
          <>
            <EditableProTable<DataSourceType>
              rowKey="id"
              // headerTitle="可编辑表格"
              maxLength={999}
              recordCreatorProps={
                position !== 'hidden'
                  ? {
                      position: position as 'top',
                      record: newRecord,
                    }
                  : false
              }
              columns={columns2}
              request={async () => ({
                data: defaultData,
                total: 3,
                success: true,
              })}
              value={dataSource}
              onChange={setDataSource}
              editable={{
                type: 'single',
                editableKeys,
                onSave: async () => {
                  await waitTime(2000)
                  setNewRecord({
                    id: (Math.random() * 1000000).toFixed(0),
                  })
                },
                onChange: setEditableRowKeys,
              }}
            />
          </>
        </TabPane>

        <TabPane
          className={styles.tabPane3}
          style={{ height: formHeight }}
          tab="我管理的"
          key="3"
        >
          <>
            <EditableProTable<DataSourceType>
              rowKey="id"
              // headerTitle="可编辑表格"
              maxLength={999}
              recordCreatorProps={
                position !== 'hidden'
                  ? {
                      position: position as 'top',
                      record: newRecord,
                    }
                  : false
              }
              columns={columns3}
              request={async () => ({
                data: defaultData,
                total: 3,
                success: true,
              })}
              value={dataSource}
              onChange={setDataSource}
              editable={{
                type: 'single',
                editableKeys,
                onSave: async () => {
                  await waitTime(2000)
                  setNewRecord({
                    id: (Math.random() * 1000000).toFixed(0),
                  })
                },
                onChange: setEditableRowKeys,
              }}
            />
          </>
        </TabPane>
      </Tabs>
    </div>
  )
}
