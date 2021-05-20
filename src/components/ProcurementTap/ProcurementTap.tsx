import React, { useRef, useState, useEffect } from 'react'
import styles from './ProcurementTap.module.css'
import avatar from '../../assets/header.png'
import titleAvatar from '../../assets/digAvatar.png'

import {
  Tabs,
  Form,
  Input,
  Button,
  Select,
  DatePicker,
  Space,
  TreeSelect,
  Table,
  Tag,
  Drawer,
  Divider,
  Timeline,
} from 'antd'

const { Option } = Select
const { RangePicker } = DatePicker
const { TextArea } = Input
const { TreeNode } = TreeSelect
// 标签页相关
const { TabPane } = Tabs
function callback(key) {
  // console.log(key)
}

// table设置
const columns: any = [
  { width: 30 },
  {
    title: '发起人',
    dataIndex: 'name',
    width: 100,
  },
  {
    title: '采购类型',
    dataIndex: 'type',
    width: 120,
  },

  {
    title: '物品名称',
    dataIndex: 'goodsName',
    width: 100,
  },

  {
    title: '物品规格',
    dataIndex: 'goodsSpecification',
    width: 100,
  },

  {
    title: '物品数量',
    dataIndex: 'goodsQuantity',
    width: 100,
  },

  {
    title: '物品价格',
    dataIndex: 'goodsPrice',
    width: 100,
  },
  {
    title: '期望交付时间',
    dataIndex: 'time',
  },

  {
    title: '状态',
    key: 'tags',
    dataIndex: 'state',
    width: 160,
    render: (tags: any) => (
      <span>
        {tags.map(tag => {
          let color = ''
          switch (tag) {
            case '审批中':
              color = 'warning'
              break
            case '审批通过':
              color = 'success'
              break
            case '审批拒绝':
              color = 'error'
              break
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          )
        })}
      </span>
    ),
  },
]
// table数据源
const data = [
  {
    key: '1',
    name: '张三',
    type: '办公用品',
    time: '2021-01-01',
    state: ['审批中'],
    goodsName: '记事本',
    goodsSpecification: '无',
    goodsQuantity: '10',
    goodsPrice: '28',
  },
  {
    key: '2',
    name: '李四',
    type: '办公用品',
    time: '2021-01-01',
    state: ['审批中'],
    goodsName: '记事本',
    goodsSpecification: '无',
    goodsQuantity: '10',
    goodsPrice: '28',
  },
  {
    key: '3',
    name: '王五',
    type: '办公用品',
    time: '2021-01-01',
    state: ['审批拒绝'],
    goodsName: '记事本',
    goodsSpecification: '无',
    goodsQuantity: '10',
    goodsPrice: '28',
  },
  {
    key: '4',
    name: '张三',
    type: '办公用品',
    time: '2021-01-01',
    state: ['审批通过'],
    goodsName: '记事本',
    goodsSpecification: '无',
    goodsQuantity: '10',
    goodsPrice: '28',
  },
  {
    key: '5',
    name: '李四',
    type: '办公用品',
    time: '2021-01-01',
    state: ['审批通过'],
    goodsName: '记事本',
    goodsSpecification: '无',
    goodsQuantity: '10',
    goodsPrice: '28',
  },
  {
    key: '6',
    name: '王五',
    type: '办公用品',
    time: '2021-01-01',
    state: ['审批通过'],
    goodsName: '记事本',
    goodsSpecification: '无',
    goodsQuantity: '10',
    goodsPrice: '28',
  },
  {
    key: '7',
    name: '李四',
    type: '办公用品',
    time: '2021-01-01',
    state: ['审批通过'],
    goodsName: '记事本',
    goodsSpecification: '无',
    goodsQuantity: '10',
    goodsPrice: '28',
  },
  {
    key: '8',
    name: '王五',
    type: '办公用品',
    time: '2021-01-01',
    state: ['审批拒绝'],
    goodsName: '记事本',
    goodsSpecification: '无',
    goodsQuantity: '10',
    goodsPrice: '28',
  },
  {
    key: '9',
    name: '王五',
    type: '办公用品',
    time: '2021-01-01',
    state: ['审批通过'],
    goodsName: '记事本',
    goodsSpecification: '无',
    goodsQuantity: '10',
    goodsPrice: '28',
  },
  {
    key: '10',
    name: '李四',
    type: '办公用品',
    time: '2021-01-01',
    state: ['审批通过'],
    goodsName: '记事本',
    goodsSpecification: '无',
    goodsQuantity: '10',
    goodsPrice: '28',
  },
  {
    key: '11',
    name: 'End',
    type: '办公用品',
    time: '2021-01-01',
    state: ['审批通过'],
    goodsName: '记事本',
    goodsSpecification: '无',
    goodsQuantity: '10',
    goodsPrice: '28',
  },
  {
    key: '12',
    name: '王五',
    type: '办公用品',
    time: '2021-01-01',
    state: ['审批通过'],
    goodsName: '记事本',
    goodsSpecification: '无',
    goodsQuantity: '10',
    goodsPrice: '28',
  },
  {
    key: '13',
    name: '李四',
    type: '办公用品',
    time: '2021-01-01',
    state: ['审批通过'],
    goodsName: '记事本',
    goodsSpecification: '无',
    goodsQuantity: '10',
    goodsPrice: '28',
  },
  {
    key: '14',
    name: 'End',
    type: '办公用品',
    time: '2021-01-01',
    state: ['审批通过'],
    goodsName: '记事本',
    goodsSpecification: '无',
    goodsQuantity: '10',
    goodsPrice: '28',
  },
  {
    key: '15',
    name: '王五',
    type: '办公用品',
    time: '2021-01-01',
    state: ['审批通过'],
    goodsName: '记事本',
    goodsSpecification: '无',
    goodsQuantity: '10',
    goodsPrice: '28',
  },
  {
    key: '16',
    name: '李四',
    type: '办公用品',
    time: '2021-01-01',
    state: ['审批通过'],
    goodsName: '记事本',
    goodsSpecification: '无',
    goodsQuantity: '10',
    goodsPrice: '28',
  },
  {
    key: '17',
    name: 'End',
    type: '办公用品',
    time: '2021-01-01',
    state: ['审批通过'],
    goodsName: '记事本',
    goodsSpecification: '无',
    goodsQuantity: '10',
    goodsPrice: '28',
  },

  {
    key: '18',
    name: '王五',
    type: '办公用品',
    time: '2021-01-01',
    state: ['审批通过'],
    goodsName: '记事本',
    goodsSpecification: '无',
    goodsQuantity: '10',
    goodsPrice: '28',
  },
  {
    key: '19',
    name: '李四',
    type: '办公用品',
    time: '2021-01-01',
    state: ['审批通过'],
    goodsName: '记事本',
    goodsSpecification: '无',
    goodsQuantity: '10',
    goodsPrice: '28',
  },
  {
    key: '20',
    name: 'End',
    type: '办公用品',
    time: '2021-01-01',
    state: ['审批通过'],
    goodsName: '记事本',
    goodsSpecification: '无',
    goodsQuantity: '10',
    goodsPrice: '28',
  },
]

// 抽屉数据源
const drawerData = [
  {
    title: '申请编号',
    value: '202003190001',
  },
  {
    title: '采购类型',
    value: '办公用品',
  },
  {
    title: '采购物品名称',
    value: '笔记本',
  },
  {
    title: '采购物品规格',
    value: '无',
  },
  {
    title: '采购物品数量',
    value: '1',
  },
  {
    title: '采购物品价格',
    value: '6666元',
  },
  {
    title: '期望交付时间',
    value: '2020-01-01',
  },
  {
    title: '采购事由',
    value:
      '测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试',
  },
]

export const ProcurementTap: React.FC = () => {
  const inputEL = useRef<any>(null)
  const [form] = Form.useForm()
  // from自适应窗口大小高度
  let [formHeight, setformHeight] = useState<any>(605)
  const changeResize = () => {
    setformHeight(document.documentElement.clientHeight - 24 - 46)
  }
  useEffect(() => {
    window.addEventListener('resize', changeResize)
  })
  // 选择树相关
  const [value, setValue] = useState(undefined)
  const onChangeTree = () => {
    setValue(value)
  }
  // 表单相关
  // 提交表单且数据验证成功后回调事件
  const onFinish = (values: any) => {
    console.log('Success:', values)
  }
  // 提交表单且数据验证失败后回调事件
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  // 计算请假时长
  function onChange(value, dateString) {
    let timer = Number(value[1]._d) - Number(value[0]._d)
    let timeDate = ''
    if (Math.ceil(timer / 3600000) <= 4) {
      timeDate = '0.5天'
    } else if (Math.ceil(timer / 3600000) <= 8) {
      timeDate = '1天'
    } else {
      timeDate = Math.ceil(timer / 3600000 / 24) + '天'
    }

    form.setFieldsValue({
      timeLong: timeDate,
      time: value,
    })
  }

  // 抽屉模态框相关
  const [visible, setVisible] = useState(false)
  const showDrawer = () => {
    setVisible(true)
  }
  const onClose = () => {
    setVisible(false)
  }

  // 点击表格触发抽屉
  const clickTable = e => {
    showDrawer()
  }

  // 点击抽屉内的按钮
  const drawerBtn = () => {
    setVisible(false)
  }

  return (
    <div className={styles.procurementTap}>
      <Tabs defaultActiveKey="1" onChange={callback}>
        <TabPane
          style={{ height: formHeight }}
          className={styles.tabPane1}
          tab="发起审批"
          key="1"
        >
          <Form
            name="basic"
            form={form}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            layout="vertical"
          >
            <Form.Item name="Type" label="采购类型" rules={[{ required: true }]}>
              <Select placeholder="请选择采购类型" allowClear>
                <Option value="1">办公用品</Option>
                <Option value="2">生产物料</Option>
                <Option value="3">活动用品</Option>
                <Option value="4">其他</Option>
              </Select>
            </Form.Item>

            <Form.Item
              label="期望交付时间"
              name="time"
              rules={[{ required: true, message: '请选择期望交付时间' }]}
            >
              <Space direction="vertical" size={12}>
                <DatePicker onChange={onChange} />
              </Space>
            </Form.Item>

            <Form.Item
              label="物品名称"
              name="timeLong"
              rules={[{ required: true, message: '请填写采购物品名称' }]}
            >
              <Input placeholder="请填写采购物品名称" />
            </Form.Item>

            <Form.Item
              label="物品规格"
              name="timeLong"
              rules={[{ required: true, message: '请填写采购物品规格' }]}
            >
              <Input placeholder="请填写采购物品规格" />
            </Form.Item>

            <Form.Item
              label="物品数量"
              name="timeLong"
              rules={[{ required: true, message: '请填写采购物品数量' }]}
            >
              <Input placeholder="请填写采购物品数量" />
            </Form.Item>

            <Form.Item
              label="物品价格"
              name="timeLong"
              rules={[{ required: true, message: '请填写采购物品价格' }]}
            >
              <Input placeholder="请填写采购物品价格" />
            </Form.Item>

            <Form.Item
              label="采购事由"
              name="cause"
              rules={[{ required: true, message: '请填写采购事由' }]}
            >
              <TextArea placeholder="请填写采购事由" rows={4} />
            </Form.Item>

            <Form.Item
              label="审批人"
              name="recipient"
              rules={[{ required: true, message: '请选择审批人' }]}
            >
              <TreeSelect
                className={styles.recipientCheck}
                showSearch
                style={{ width: '100%' }}
                value={value}
                dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                placeholder="请选择审批人"
                allowClear
                treeDefaultExpandAll
                onChange={onChangeTree}
              >
                <TreeNode value="上海传慎" title="上海传慎" disabled>
                  <TreeNode value="技术部" title="技术部" disabled>
                    <TreeNode value="张三" title="张三" />
                    <TreeNode value="赵四" title="赵四" />
                  </TreeNode>
                  <TreeNode value="人事部" title="人事部" disabled>
                    <TreeNode
                      value="赵六"
                      title={
                        <>
                          <img
                            src={avatar}
                            style={{ width: '18px', height: '18px' }}
                            alt=""
                          />
                          <span style={{ marginLeft: '4px' }}>赵六</span>
                        </>
                      }
                    />
                  </TreeNode>
                </TreeNode>
              </TreeSelect>
            </Form.Item>

            <Form.Item label="抄送" name="share">
              <TreeSelect
                className={styles.shareCheck}
                showSearch
                style={{ width: '100%' }}
                value={value}
                dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                placeholder="请选择抄送人"
                allowClear
                treeDefaultExpandAll
                onChange={onChangeTree}
              >
                <TreeNode value="上海传慎" title="上海传慎" disabled>
                  <TreeNode value="技术部" title="技术部" disabled>
                    <TreeNode value="张三" title="张三" />
                    <TreeNode value="赵四" title="赵四" />
                  </TreeNode>
                  <TreeNode value="人事部" title="人事部" disabled>
                    <TreeNode
                      value="赵六"
                      title={
                        <>
                          <img
                            src={avatar}
                            style={{ width: '18px', height: '18px' }}
                            alt=""
                          />
                          <span style={{ marginLeft: '4px' }}>赵六</span>
                        </>
                      }
                    />
                  </TreeNode>
                </TreeNode>
              </TreeSelect>
            </Form.Item>

            <Form.Item style={{ textAlign: 'center' }}>
              <Button type="primary" className={styles.formBtn} htmlType="submit">
                提交
              </Button>
            </Form.Item>
          </Form>
        </TabPane>

        <TabPane
          className={styles.tabPane2}
          style={{ height: formHeight }}
          tab="我发起的"
          key="2"
        >
          <Table
            columns={columns}
            dataSource={data}
            pagination={false}
            onRow={record => {
              return {
                onClick: clickTable,
              }
            }}
          />

          <Drawer
            title={
              <div className={styles.DrawerBox}>
                <img src={titleAvatar} className={styles.DrawerAvatar} alt="" />
                <div className={styles.DrawerText}>
                  <div className={styles.DrawerTitle}>
                    <span style={{ marginRight: '10px' }}>张三的采购审批</span>
                    <Tag color="gold">审批中</Tag>
                  </div>
                  <div style={{ fontSize: '14px', color: '#A1A5AD' }}>研发部</div>
                </div>
              </div>
            }
            placement="right"
            width={480}
            closable={false}
            onClose={onClose}
            visible={visible}
            footer={
              <div
                style={{
                  textAlign: 'center',
                }}
              >
                <Button
                  style={{ width: 86, marginRight: 60, borderRadius: '6px' }}
                  onClick={drawerBtn}
                >
                  拒绝
                </Button>
                <Button
                  type="primary"
                  style={{ width: 86, borderRadius: '6px' }}
                  onClick={drawerBtn}
                >
                  同意
                </Button>
              </div>
            }
          >
            <div className={styles.DrawerContent}>
              {drawerData.map((item, index) => {
                return (
                  <div key={index} style={{ marginBottom: '10px' }}>
                    <div style={{ color: '#9E9E9E' }}>{item.title}</div>
                    <div>{item.value}</div>
                  </div>
                )
              })}
            </div>
            <Divider dashed />
            <div className={styles.flow}>
              <Timeline>
                <Timeline.Item>
                  <span>
                    张三&emsp;&nbsp;<span style={{ color: '#1890FF' }}>发起病假审批</span>
                  </span>
                  <span
                    style={{ marginRight: '10px', color: '#A1A5AD', fontSize: '12px' }}
                  >
                    2015-09-01
                  </span>
                </Timeline.Item>
                <Timeline.Item>
                  <span>
                    李四&emsp;&nbsp;<span style={{ color: '#52C41A' }}>通过审批</span>
                  </span>
                  <span
                    style={{ marginRight: '10px', color: '#A1A5AD', fontSize: '12px' }}
                  >
                    2015-09-01
                  </span>
                </Timeline.Item>
                <Timeline.Item>
                  <span>
                    赵六&emsp;&nbsp;<span style={{ color: '#FA8C16' }}>审批中</span>
                  </span>
                  <span
                    style={{ marginRight: '10px', color: '#A1A5AD', fontSize: '12px' }}
                  >
                    2015-09-01
                  </span>
                </Timeline.Item>
              </Timeline>
            </div>
          </Drawer>
        </TabPane>

        <TabPane
          className={styles.tabPane2}
          style={{ height: formHeight }}
          tab="我审批的"
          key="3"
        >
          Content of Tab Pane 3
        </TabPane>

        <TabPane
          className={styles.tabPane2}
          style={{ height: formHeight }}
          tab="抄送我的"
          key="4"
        >
          Content of Tab Pane 4
        </TabPane>
      </Tabs>
    </div>
  )
}
