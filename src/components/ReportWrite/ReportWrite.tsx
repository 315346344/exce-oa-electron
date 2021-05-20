/**
 * 汇报页面的组件
 * 填写汇报
 */

import React, { useRef, useState, useEffect } from 'react'
import styles from './ReportWrite.module.css'

import avatar from '../../assets/header.png'

import { Tabs, Form, Input, Button, Select, Upload, TreeSelect } from 'antd'

import { UploadOutlined } from '@ant-design/icons'

const { Option } = Select
const { TextArea } = Input
const { TreeNode } = TreeSelect
// 标签页相关
const { TabPane } = Tabs
function callback(key) {
  // console.log(key)
}

// 上传文件
const fileList: any = [
  {
    uid: '-1',
    name: 'xxx.png',
    status: 'done',
    url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    thumbUrl:
      'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  },
  // {
  //   uid: '-2',
  //   name: 'yyy.png',
  //   status: 'error',
  // },
]

export const ReportWrite: React.FC = () => {
  const [form] = Form.useForm()
  const [form2] = Form.useForm()
  const [form3] = Form.useForm()
  const [form4] = Form.useForm()
  // from自适应窗口大小高度
  let [formHeight, setformHeight] = useState<any>(605)
  const changeResize = () => {
    setformHeight(document.documentElement.clientHeight - 24 - 46)
  }
  useEffect(() => {
    window.addEventListener('resize', changeResize)
  }, [])
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

  // 上传文件
  const normFile = (e: any) => {
    console.log('Upload event:', e)

    if (Array.isArray(e)) {
      return e
    }
    return e && e.fileList
  }

  return (
    <div className={styles.reportWrite}>
      <Tabs defaultActiveKey="1" onChange={callback}>
        <TabPane
          style={{ height: formHeight }}
          className={styles.tabPane1}
          tab="日报"
          key="1"
        >
          <Form
            name="day"
            form={form}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            layout="vertical"
          >
            <Form.Item
              label="今日工作总结"
              name="cause"
              rules={[{ required: true, message: '请填写今日工作总结' }]}
            >
              <TextArea placeholder="请填写今日工作总结" rows={4} />
            </Form.Item>

            <div style={{ marginTop: '-10px' }}>
              <div>今日工作计划</div>
              <div style={{ color: '#666' }}>
                测试测试测试测试测试测试测试测试测试测试测试测试
              </div>
            </div>
            <div style={{ marginTop: '12px' }}>
              <div>明日工作计划</div>
              <div style={{ color: '#666' }}>
                测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试
              </div>
            </div>

            <Form.Item
              name="upload"
              label="上传文件"
              valuePropName="fileList"
              getValueFromEvent={normFile}
              style={{ marginTop: '12px' }}
            >
              <Upload
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                listType="picture"
                defaultFileList={[...fileList]}
              >
                <Button icon={<UploadOutlined />}>上传</Button>
              </Upload>
            </Form.Item>

            <Form.Item
              label="接收人"
              name="recipient"
              rules={[{ required: true, message: '请选择接收人' }]}
            >
              <TreeSelect
                className={styles.recipientCheck}
                showSearch
                style={{ width: '100%' }}
                value={value}
                dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                placeholder="请选择接收人"
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
          tab="周报"
          key="2"
        >
          <Form
            name="week"
            form={form2}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            layout="vertical"
          >
            <Form.Item
              label="本周工作总结"
              name="cause"
              rules={[{ required: true, message: '请填写本周工作总结' }]}
            >
              <TextArea placeholder="请填写本周工作总结" rows={4} />
            </Form.Item>

            <div style={{ marginTop: '-10px' }}>
              <div>本周工作计划</div>
              <div style={{ color: '#666' }}>
                测试测试测试测试测试测试测试测试测试测试测试测试
              </div>
            </div>

            <Form.Item
              label="下周一工作计划"
              name="mon"
              rules={[{ required: true, message: '请填写下周一工作计划' }]}
              style={{ marginTop: '12px' }}
            >
              <TextArea placeholder="请填下周一工作计划" rows={1} />
            </Form.Item>
            <Form.Item
              label="下周二工作计划"
              name="tue"
              rules={[{ required: true, message: '请填写下周二工作计划' }]}
            >
              <TextArea placeholder="请填下周二工作计划" rows={1} />
            </Form.Item>
            <Form.Item
              label="下周三工作计划"
              name="wed"
              rules={[{ required: true, message: '请填写下周三工作计划' }]}
            >
              <TextArea placeholder="请填下周三工作计划" rows={1} />
            </Form.Item>
            <Form.Item
              label="下周四工作计划"
              name="thu"
              rules={[{ required: true, message: '请填写下周四工作计划' }]}
            >
              <TextArea placeholder="请填下周四工作计划" rows={1} />
            </Form.Item>
            <Form.Item
              label="下周五工作计划"
              name="fri"
              rules={[{ required: true, message: '请填写下周五工作计划' }]}
            >
              <TextArea placeholder="请填下周五工作计划" rows={1} />
            </Form.Item>

            <Form.Item
              name="upload"
              label="上传文件"
              valuePropName="fileList"
              getValueFromEvent={normFile}
            >
              <Upload
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                listType="picture"
                defaultFileList={[...fileList]}
              >
                <Button icon={<UploadOutlined />}>上传</Button>
              </Upload>
            </Form.Item>

            <Form.Item
              label="接收人"
              name="recipient"
              rules={[{ required: true, message: '请选择接收人' }]}
            >
              <TreeSelect
                className={styles.recipientCheck}
                showSearch
                style={{ width: '100%' }}
                value={value}
                dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                placeholder="请选择接收人"
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
          className={styles.tabPane3}
          style={{ height: formHeight }}
          tab="月报"
          key="3"
        >
          <Form
            name="month"
            form={form3}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            layout="vertical"
          >
            <Form.Item
              label="本月工作总结"
              name="cause"
              rules={[{ required: true, message: '请填写本月工作总结' }]}
            >
              <TextArea placeholder="请填写本月工作总结" rows={4} />
            </Form.Item>

            <div style={{ marginTop: '-10px' }}>
              <div>本月工作计划</div>
              <div style={{ color: '#666' }}>
                测试测试测试测试测试测试测试测试测试测试测试测试
              </div>
            </div>

            <Form.Item
              label="下月工作计划"
              name="nextMonth"
              rules={[{ required: true, message: '请填写下月工作计划' }]}
              style={{ marginTop: '12px' }}
            >
              <TextArea placeholder="请填写下月工作计划" rows={4} />
            </Form.Item>

            <Form.Item
              name="upload"
              label="上传文件"
              valuePropName="fileList"
              getValueFromEvent={normFile}
            >
              <Upload
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                listType="picture"
                defaultFileList={[...fileList]}
              >
                <Button icon={<UploadOutlined />}>上传</Button>
              </Upload>
            </Form.Item>

            <Form.Item
              label="接收人"
              name="recipient"
              rules={[{ required: true, message: '请选择接收人' }]}
            >
              <TreeSelect
                className={styles.recipientCheck}
                showSearch
                style={{ width: '100%' }}
                value={value}
                dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                placeholder="请选择接收人"
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
          className={styles.tabPane4}
          style={{ height: formHeight }}
          tab="拜访计划"
          key="4"
        >
          <Form
            name="visit"
            form={form4}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            layout="vertical"
          >
            <Form.Item
              label="拜访目标"
              name="target"
              rules={[{ required: true, message: '请填写拜访目标' }]}
            >
              <Input placeholder="请填写拜访目标" />
            </Form.Item>

            <Form.Item
              label="拜访目的"
              name="purpose"
              rules={[{ required: true, message: '请填写拜访目的' }]}
            >
              <TextArea placeholder="请填写拜访目的" rows={4} />
            </Form.Item>

            <Form.Item
              name="upload"
              label="上传文件"
              valuePropName="fileList"
              getValueFromEvent={normFile}
            >
              <Upload
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                listType="picture"
                defaultFileList={[...fileList]}
              >
                <Button icon={<UploadOutlined />}>上传</Button>
              </Upload>
            </Form.Item>

            <Form.Item
              label="接收人"
              name="recipient"
              rules={[{ required: true, message: '请选择接收人' }]}
            >
              <TreeSelect
                className={styles.recipientCheck}
                showSearch
                style={{ width: '100%' }}
                value={value}
                dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                placeholder="请选择接收人"
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
      </Tabs>
    </div>
  )
}
