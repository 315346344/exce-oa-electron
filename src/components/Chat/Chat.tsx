/**
 * 聊天相关模块
 */
import React, { useState, useEffect } from 'react'
import styles from './Chat.module.css'
// import { useHistory, useLocation } from 'react-router-dom'

import file from '../../assets/file.png'
import aduitAvatar from '../../assets/aduitColor.png'
import chatFile from '../../assets/chat-file.png'
import chatJie from '../../assets/chat-jie.png'
import chatFa from '../../assets/chat-fa.png'

import { Input, Tooltip, Drawer, Button, Timeline } from 'antd'
import { SmileOutlined } from '@ant-design/icons'
import { Picker } from 'emoji-mart'
import 'emoji-mart/css/emoji-mart.css'
import _ from 'lodash'

const { TextArea } = Input

const titleInfo = {
  type: 'audit',
  avatar: aduitAvatar,
  title: '审批',
}

const chatData1: {
  type: string
  text?: string
  id?: string
  title?: string
  department?: string
  auditType?: string
  startTime?: string
  endTime?: string
  status?: string
}[] = [
  {
    type: 'text',
    text: '欢迎使用',
  },
  {
    type: 'text',
    text: '呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵',
  },
  {
    type: 'file',
    text: '新建文本文本文档新建文.txt',
  },
]

const chatData: {
  type: string
  text?: string
  id?: string
  title?: string
  department?: string
  auditType?: string
  startTime?: string
  endTime?: string
  status?: string
}[] = [
  {
    type: 'auditCard',
    title: '张三提交的请假需要你审批',
    id: '2021010100001',
    department: '研发部',
    auditType: '年假',
    startTime: '2021-01-01 01:21',
    endTime: '2021-01-02 01:21',
    status: 'static',
  },
  {
    type: 'auditCard',
    title: '张三提交的请假需要你审批',
    id: '2021010100002',
    department: '研发部',
    auditType: '年假',
    startTime: '2021-01-01 01:21',
    endTime: '2021-01-02 01:21',
    status: 'pass',
  },
  {
    type: 'auditCard',
    title: '张三提交的请假需要你审批',
    id: '2021010100003',
    department: '研发部',
    auditType: '年假',
    startTime: '2021-01-01 01:21',
    endTime: '2021-01-02 01:21',
    status: 'refuse',
  },

  {
    type: 'auditCard',
    title: '张三提交的请假需要你审批',
    id: '2021010100003',
    department: '研发部',
    auditType: '年假',
    startTime: '2021-01-01 01:21',
    endTime: '2021-01-02 01:21',
    status: 'refuse',
  },
]

export const Chat: React.FC = () => {
  // const location = useLocation()
  // content自适应窗口大小高度
  let [chatHeight, setChatHeight] = useState<number>(520)

  const changeResize = () => {
    setChatHeight(document.documentElement.clientHeight - 200)
  }
  useEffect(() => {
    window.addEventListener('resize', changeResize)
  })
  // 根据路由后缀，判断页面类型
  // useEffect(() => {
  //   console.log(location.pathname.substring(6))
  // }, [])

  // 抽屉相关
  const [visible, setVisible] = useState(false)
  const showDrawer = () => {
    setVisible(true)
  }
  const onClose = () => {
    setVisible(false)
  }

  // emoji相关
  const [chatContent, setChatContent] = useState('')
  const [showEmojiModal, setShowEmojiModal] = useState(false)
  let [emoji, setEmoji] = useState()

  const [onKeyUp, setOnKeyUp] = useState()

  const onChatContentChange = value => {
    setChatContent(value)
  }

  const searchEmoji = (emoji, event) => {
    console.log('emoji, event=====', emoji)
    setEmoji(emoji)
    setShowEmojiModal(false)

    let chatContentData = chatContent
    chatContentData = !_.isEmpty(chatContent) ? chatContent + emoji.native : emoji.native
    setChatContent(chatContentData)
  }

  return (
    <div className={styles.chatBox}>
      <div className={styles.top}>
        <span style={{ margin: '0 12px 0 24px' }}>
          <img src={titleInfo.avatar} style={{ width: '36px', height: '36px' }} />
        </span>
        <span style={{ fontSize: '16px' }}>{titleInfo.title}</span>
      </div>

      <div className={styles.chat} style={{ height: chatHeight }}>
        {chatData.map((item, index) => {
          if (item.type === 'text') {
            return (
              <div className={styles.item} key={index}>
                <div className={styles.itemAvata}>
                  <img src={titleInfo.avatar} style={{ width: '32px', height: '32px' }} />
                </div>
                <div className={styles.itemText}>{item.text}</div>
              </div>
            )
          } else if (item.type === 'file') {
            return (
              <div className={styles.item} key={index}>
                <div className={styles.itemAvata}>
                  <img src={titleInfo.avatar} style={{ width: '32px', height: '32px' }} />
                </div>

                <div className={styles.itemFileCard}>
                  <img src={file} className={styles.fileImg} />
                  <div className={styles.fileMsg}>
                    <div className={styles.fileMsgText}>{item.text}</div>
                    <div>
                      <span>123KB</span> | <a>打开</a> | <a>另存为</a>
                    </div>
                  </div>
                </div>
              </div>
            )
          } else if (item.type === 'auditCard') {
            return (
              <div className={styles.item} key={index} onClick={showDrawer}>
                <div className={styles.itemAvata}>
                  <img src={titleInfo.avatar} style={{ width: '32px', height: '32px' }} />
                </div>

                <div className={styles.auditCard}>
                  <div className={styles.title}>{item.title}</div>
                  <hr />
                  <div className={styles.content}>
                    <div>
                      <span>审批编号：</span>
                      <span>{item.id}</span>
                    </div>
                    <div>
                      <span>所属部门：</span>
                      <span>{item.department}</span>
                    </div>
                    <div>
                      <span>请假类型：</span>
                      <span>{item.auditType}</span>
                    </div>
                    <div>
                      <span>开始时间：</span>
                      <span>{item.startTime}</span>
                    </div>
                    <div>
                      <span>结束时间：</span>
                      <span>{item.endTime}</span>
                    </div>
                  </div>
                  <hr />
                  <div className={styles.footer}>
                    {item.status === 'static' ? (
                      <>
                        <span className={styles.footerNo}>拒绝</span>
                        <span className={styles.footerHr}></span>
                        <span className={styles.footerYes}>同意</span>
                      </>
                    ) : (
                      <>
                        {item.status === 'pass' ? (
                          <span className={styles.footerNo} style={{ color: '#3686FF' }}>
                            已同意
                          </span>
                        ) : (
                          <span className={styles.footerNo} style={{ color: '#f2725e' }}>
                            已拒绝
                          </span>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            )
          }
        })}
      </div>

      {/* emoji */}
      {/* emoji=''设置preview默认状态下不显示图片 */}
      {/*  style={{ position: 'relative', bottom: '-90px' }} */}
      <div className={styles.dialogue}>
        <div className={styles.emojiBox}>
          {/* icon */}
          <div
            style={{
              paddingLeft: '15px',
            }}
            onClick={() => setShowEmojiModal(!showEmojiModal)}
          >
            <Tooltip title="表情">
              <SmileOutlined style={{ fontSize: 20, color: '#999' }} />
            </Tooltip>
          </div>

          {/* 其余icon */}
          <div>
            <img src={chatFile} alt="" />
          </div>
          <div>
            <img src={chatJie} alt="" />
          </div>
          <div>
            <img src={chatFa} alt="" />
          </div>
        </div>

        {/* emoji */}
        <div className={styles.emoji_container}>
          {showEmojiModal && (
            <Picker
              set="apple"
              emoji=""
              showPreview={false}
              onClick={(emoji, event) => searchEmoji(emoji, event)}
            />
          )}
        </div>

        {/* input */}
        <TextArea
          placeholder="请输入消息"
          rows={4}
          // bordered={false}
          className={styles.bottom}
          value={chatContent}
          onPressEnter={e => {}}
          onKeyUp={onKeyUp}
          onChange={e => onChatContentChange(e.target.value)}
        />
      </div>

      {/* 抽屉 */}
      <Drawer
        title="张三的请假审批"
        placement="right"
        width="460px"
        bodyStyle={{ paddingTop: '12px' }}
        footer={
          <>
            <Button
              type="primary"
              style={{
                borderRadius: '6px',
                width: '80px',
                height: '32px',
              }}
              onClick={onClose}
            >
              同意
            </Button>
            <Button
              style={{ borderRadius: '6px', width: '80px', height: '32px' }}
              onClick={onClose}
            >
              拒绝
            </Button>
          </>
        }
        footerStyle={{ display: 'flex', justifyContent: 'space-around' }}
        mask={false}
        onClose={onClose}
        visible={visible}
      >
        <div className={styles.DrawerContent}>
          <div style={{ paddingBottom: '10px' }}>
            <div style={{ fontSize: '14px', color: '#9e9e9e' }}>审批编号：</div>
            <div style={{ fontSize: '14px', color: '#333333' }}>2021010100001</div>
          </div>

          <div style={{ paddingBottom: '10px' }}>
            <div style={{ fontSize: '14px', color: '#9e9e9e' }}>所属部门：</div>
            <div style={{ fontSize: '14px', color: '#333333' }}>研发部</div>
          </div>

          <div style={{ paddingBottom: '10px' }}>
            <div style={{ fontSize: '14px', color: '#9e9e9e' }}>请假类型：</div>
            <div style={{ fontSize: '14px', color: '#333333' }}>年假</div>
          </div>

          <div style={{ paddingBottom: '10px' }}>
            <div style={{ fontSize: '14px', color: '#9e9e9e' }}>开始时间：</div>
            <div style={{ fontSize: '14px', color: '#333333' }}>2021-01-01 01:21</div>
          </div>

          <div style={{ paddingBottom: '10px' }}>
            <div style={{ fontSize: '14px', color: '#9e9e9e' }}>结束时间：</div>
            <div style={{ fontSize: '14px', color: '#333333' }}>2021-01-02 01:21</div>
          </div>
        </div>

        <hr />

        <div className={styles.DrawerLine}>
          <Timeline>
            <Timeline.Item color="green">
              张三&nbsp;&nbsp;同意&nbsp;&nbsp;2020-01-01 10:23
            </Timeline.Item>
            <Timeline.Item color="green">
              张三&nbsp;&nbsp;同意&nbsp;&nbsp;2020-01-01 10:23
            </Timeline.Item>
            <Timeline.Item>
              张三&nbsp;&nbsp;正在审批中&nbsp;&nbsp;2020-01-01 10:23
            </Timeline.Item>
            <Timeline.Item color="red">
              张三&nbsp;&nbsp;拒绝&nbsp;&nbsp;2020-01-01 10:23
            </Timeline.Item>
            <Timeline.Item color="gray">
              张三&nbsp;&nbsp;等待审批&nbsp;&nbsp;
            </Timeline.Item>
          </Timeline>
        </div>

        <hr style={{ marginBottom: '12px' }} />
        <div className={styles.DrawerEstimate}>
          <Input placeholder="添加评价" />
        </div>
      </Drawer>
    </div>
  )
}
