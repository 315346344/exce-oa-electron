/**
 * 项目模块组件
 */
import React, { useState, useEffect } from 'react'
import styles from './Project.module.css'
import fileImg from '../../assets/document-file.png'
import { ProjectDoc } from '../../components'

import { Switch, Route, Redirect, useHistory } from 'react-router-dom'
import type { ProColumns } from '@ant-design/pro-table'
import { EditableProTable } from '@ant-design/pro-table'
import ProCard, { StatisticCard } from '@ant-design/pro-card'
import RcResizeObserver from 'rc-resize-observer'
import '@ant-design/pro-table/dist/table.css'
import '@ant-design/pro-card/dist/card.css'
import { Area } from '@ant-design/charts'

import { Tabs, Transfer, Tree, Timeline } from 'antd'

// 标签页相关
const { TabPane } = Tabs
function callback(key) {
  // console.log(key)
}

// 任务列表相关
const waitTime = (time: number = 100) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(true)
    }, time)
  })
}

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
    title: '活动名称一',
    principal: 'zhangsan',
    state: 'open',
    time: '2020-05-26T09:42:56Z',
  },
  {
    id: 624691229,
    title: '活动名称二',
    principal: 'lisi',
    state: 'closed',
    time: '2020-07-26T08:19:22Z',
  },

  {
    id: 624691239,
    title: '活动名称三',
    principal: 'wangwu',
    state: 'all',
    time: '2020-12-26T08:19:22Z',
  },
]

// 穿搜框
const isChecked = (selectedKeys, eventKey) =>
  selectedKeys.indexOf(eventKey) !== -1

const generateTree = (
  treeNodes: Array<any> = [],
  checkedKeys: Array<any> = [],
) =>
  treeNodes.map(({ children, ...props }) => ({
    ...props,
    disabled: checkedKeys.includes(props.key),
    children: generateTree(children, checkedKeys),
  }))

interface TreeTransferPropsType {
  dataSource: Array<any>
  targetKeys: Array<any>
  onChange: {
    (any): void
  }
}

const TreeTransfer: React.FC<TreeTransferPropsType> = ({
  dataSource,
  targetKeys,
  ...restProps
}) => {
  const transferDataSource: Array<any> = []
  // 备份一份data作为搜索使用
  const dataSourceData = dataSource

  function flatten(list: Array<any> = []) {
    list.forEach(item => {
      transferDataSource.push(item)
      flatten(item.children)
    })
  }

  flatten(dataSource)

  return (
    <Transfer
      {...restProps}
      targetKeys={targetKeys}
      dataSource={transferDataSource}
      className="tree-transfer"
      render={item => item.title}
      showSelectAll={false}
      titles={['组织成员', '项目成员']}
      showSearch={true}
      /**
       * 组件提供的左侧搜索栏没效果，通过事件绑定重新赋予搜索功能
       * dir 用于分辨左右搜索框
       * val 键盘输入的value
       */
      onSearch={(dir, val) => {
        if (dir === 'left') {
          const find = (arr, fn, result) => {
            arr.forEach(item => {
              if (item.children) {
                find(item.children, fn, result)
              } else {
                if (fn(item)) {
                  result.push(item)
                }
              }
            })
          }

          let result = []
          find(
            dataSourceData,
            item => {
              return item.title.indexOf(val) > -1
            },
            result,
          )

          dataSource = result
        }
      }}
    >
      {({ direction, onItemSelect, selectedKeys }) => {
        if (direction === 'left') {
          const checkedKeys = [...selectedKeys, ...targetKeys]
          return (
            <Tree
              blockNode
              checkable
              checkStrictly
              defaultExpandAll
              height={490}
              checkedKeys={checkedKeys}
              treeData={generateTree(dataSource, targetKeys)}
              onCheck={(_, { node: { key } }) => {
                onItemSelect(key.toString(), !isChecked(checkedKeys, key))
              }}
              onSelect={(_, { node: { key } }) => {
                onItemSelect(
                  key.toString() as string,
                  !isChecked(checkedKeys, key),
                )
              }}
            />
          )
        }
      }}
    </Transfer>
  )
}

const treeData = [
  { key: '人事部', title: '人事部', disabled: true, checkable: false },
  {
    key: '0-1',
    title: '技术部',
    disabled: true,
    checkable: false,
    children: [
      {
        key: '0-1-0',
        title: '技术一部',
        disabled: true,
        checkable: false,
        children: [
          { key: '0-1-1', title: '张三' },
          { key: '0-1-2', title: '李四' },
        ],
      },
      {
        key: '0-2-0',
        title: '技术二部',
        disabled: true,
        checkable: false,
        children: [
          { key: '0-2-1', title: '张三' },
          { key: '0-2-2', title: '李四' },
        ],
      },
    ],
  },
  {
    key: '0-3-0',
    title: '研发部',
    disabled: true,
    checkable: false,
    children: [
      { key: '0-3-1', title: '张三' },
      { key: '0-3-2', title: '李四2' },
    ],
  },
  { key: '0-3', title: '张三' },
  { key: '0-4', title: '李四' },
  { key: '0-5', title: '王五' },
  { key: '0-6', title: 'end' },
]

export const Project: React.FC = () => {
  const [responsive, setResponsive] = useState(false)
  // 穿搜框
  const [targetKeys, setTargetKeys] = useState([])
  const onChange = keys => {
    setTargetKeys(keys)
  }

  // from自适应窗口大小高度
  let [formHeight, setformHeight] = useState<any>(630)
  const changeResize = () => {
    setformHeight(document.documentElement.clientHeight - 24 - 46)
  }
  useEffect(() => {
    window.addEventListener('resize', changeResize)
  }, [])
  // 折线图
  const [data, setData] = useState([])
  useEffect(() => {
    asyncFetch()
  }, [])
  const asyncFetch = () => {
    fetch(
      'https://gw.alipayobjects.com/os/bmw-prod/1d565782-dde4-4bb6-8946-ea6a38ccf184.json',
    )
      .then(response => response.json())
      .then(json => setData(json))
      .catch(error => {
        console.log('fetch data failed', error)
      })
  }
  const config = {
    data: data,
    xField: 'Date',
    yField: 'scales',
    height: 260,
    xAxis: { tickCount: 5 },
    areaStyle: function areaStyle() {
      return { fill: 'l(270) 0:#ffffff 0.5:#7ec2f3 1:#1890ff' }
    },
  }

  // 任务列表相关
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([])
  const [dataSource, setDataSource] = useState<DataSourceType[]>([])
  const [position, setPosition] = useState<'top' | 'bottom' | 'hidden'>('top')
  const [newRecord, setNewRecord] = useState({
    id: (Math.random() * 1000000).toFixed(0),
  })

  // 表格
  const columns: ProColumns<DataSourceType>[] = [
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

  return (
    <div className={styles.projectBox}>
      <Tabs defaultActiveKey="1" onChange={callback}>
        <TabPane
          style={{ height: formHeight }}
          className={styles.tabPane1}
          tab="任务列表"
          key="1"
        >
          <>
            <EditableProTable<DataSourceType>
              rowKey="id"
              // headerTitle="可编辑表格"
              maxLength={5}
              recordCreatorProps={
                position !== 'hidden'
                  ? {
                      position: position as 'top',
                      record: newRecord,
                    }
                  : false
              }
              // toolBarRender={() => [
              //   <ProFormRadio.Group
              //     key="render"
              //     fieldProps={{
              //       value: position,
              //       onChange: e => setPosition(e.target.value),
              //     }}
              //     options={[
              //       {
              //         label: '添加到顶部',
              //         value: 'top',
              //       },
              //       {
              //         label: '添加到底部',
              //         value: 'bottom',
              //       },
              //       {
              //         label: '隐藏',
              //         value: 'hidden',
              //       },
              //     ]}
              //   />,
              // ]}
              columns={columns}
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
          tab="项目文档"
          key="2"
        >
          <div className={styles.document}>
            <div className={styles.documentLeft}>
              <div className={styles.documentList}>
                <img src={fileImg} alt="" />
                <span className={styles.documentText}>
                  文档1文档1文档1文档1文档1文档1文档1文档1文档1文档1文档1文档1文档1文档1文档1文档1文档1文档1文档1文档1文档1文档1文档1文档1文档1文档1文档1文档1文档1文档1文档1
                </span>
              </div>
              <div className={styles.documentList}>
                <img src={fileImg} alt="" />
                <span className={styles.documentText}>文档2</span>
              </div>
              <div className={styles.documentList}>
                <img src={fileImg} alt="" />
                <span className={styles.documentText}>文档3</span>
              </div>
            </div>
            <div className={styles.documentLine}></div>
            <div className={styles.documentRight}>
              <Switch>
                <Route path="/home/project" component={ProjectDoc} />

                {/* <Redirect from="/audit" to="/audit/0" /> */}
              </Switch>
            </div>
          </div>
        </TabPane>

        <TabPane
          className={styles.tabPane3}
          style={{ height: formHeight }}
          tab="成员管理"
          key="3"
        >
          <TreeTransfer
            dataSource={treeData}
            targetKeys={targetKeys}
            onChange={onChange}
          />
        </TabPane>

        <TabPane
          className={styles.tabPane4}
          style={{ height: formHeight }}
          tab="项目概况"
          key="4"
        >
          <RcResizeObserver
            key="resize-observer"
            onResize={offset => {
              setResponsive(offset.width < 640)
            }}
          >
            <ProCard
              split={responsive ? 'horizontal' : 'vertical'}
              headerBordered
            >
              <ProCard split="horizontal">
                <ProCard split="horizontal">
                  <ProCard split="vertical">
                    <StatisticCard
                      statistic={{
                        title: '昨日完成任务',
                        value: 24,
                        // description: (
                        //   <Statistic title="较本月平均流量" value="8.04%" trend="down" />
                        // ),
                      }}
                    />
                    <StatisticCard
                      statistic={{
                        title: '本月完成任务',
                        value: 142,
                        // description: (
                        //   <Statistic title="月同比" value="8.04%" trend="up" />
                        // ),
                      }}
                    />
                  </ProCard>
                  <ProCard split="vertical">
                    <StatisticCard
                      statistic={{
                        title: '进行中任务',
                        value: '12/56',
                      }}
                    />
                    <StatisticCard
                      statistic={{
                        title: '历史任务总数',
                        value: '234',
                      }}
                    />
                  </ProCard>
                </ProCard>
                <StatisticCard
                  title="任务量走势"
                  chart={<Area {...config} />}
                />
              </ProCard>
              {/* <StatisticCard
                title="项目进度分析"
                chart={
                  <img
                    src="https://gw.alipayobjects.com/zos/alicdn/qoYmFMxWY/jieping2021-03-29%252520xiawu4.32.34.png"
                    alt="大盘"
                    width="100%"
                  />
                }
              /> */}
              <StatisticCard
                title="历史记录"
                chart={
                  <Timeline
                    style={{
                      height: formHeight - 130,
                      overflow: 'auto',
                      paddingTop: '10px',
                      marginTop: '-10px',
                    }}
                  >
                    <Timeline.Item>
                      2020-01-01 李四 分配任务 给张三 测试测试
                    </Timeline.Item>
                    <Timeline.Item color="green">
                      2020-01-01 张三 完成了任务 测试测试
                    </Timeline.Item>
                    <Timeline.Item>
                      2020-01-01 李四 分配任务 给张三 测试测试
                    </Timeline.Item>
                    <Timeline.Item color="red">
                      2020-01-01 张三 任务超时 测试测试
                    </Timeline.Item>
                    <Timeline.Item color="green">
                      2020-01-01 张三 完成了任务 测试测试
                    </Timeline.Item>
                    <Timeline.Item color="red">
                      2020-01-01 张三 任务超时 测试测试
                    </Timeline.Item>
                    <Timeline.Item color="green">
                      2020-01-01 张三 完成了任务 测试测试
                    </Timeline.Item>
                    <Timeline.Item color="green">
                      2020-01-01 张三 完成了任务 测试测试
                    </Timeline.Item>

                    <Timeline.Item>
                      2020-01-01 李四 分配任务 给张三 测试测试
                    </Timeline.Item>
                    <Timeline.Item color="green">
                      2020-01-01 张三 完成了任务 测试测试
                    </Timeline.Item>
                    <Timeline.Item>
                      2020-01-01 李四 分配任务 给张三 测试测试
                    </Timeline.Item>
                    <Timeline.Item color="red">
                      2020-01-01 张三 任务超时 测试测试
                    </Timeline.Item>
                    <Timeline.Item color="green">
                      2020-01-01 张三 完成了任务 测试测试
                    </Timeline.Item>
                    <Timeline.Item color="red">
                      2020-01-01 张三 任务超时 测试测试
                    </Timeline.Item>
                    <Timeline.Item color="green">
                      2020-01-01 张三 完成了任务 测试测试
                    </Timeline.Item>
                    <Timeline.Item color="green">
                      2020-01-01 张三 完成了任务 测试测试
                    </Timeline.Item>
                  </Timeline>
                }
              />
            </ProCard>
          </RcResizeObserver>
        </TabPane>
      </Tabs>
    </div>
  )
}
