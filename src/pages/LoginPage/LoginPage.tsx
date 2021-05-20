import React from 'react'
import styles from './LoginPage.module.css'

import { message } from 'antd'
import ProForm, { ProFormText, ProFormCaptcha } from '@ant-design/pro-form'
import { MobileOutlined, MailOutlined } from '@ant-design/icons'

import logo from '../../assets/login-logo.png'

const waitTime = (time: number = 100) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(true)
    }, time)
  })
}

export const LoginPage = () => {
  return (
    <div className={styles.LoginPageBox}>
      <ProForm
        onFinish={async () => {
          await waitTime(2000)
          message.success('提交成功')
        }}
        submitter={{
          searchConfig: {
            submitText: '登录',
          },
          render: (_, dom) => dom.pop(),
          submitButtonProps: {
            size: 'large',
            style: {
              width: '100%',
            },
          },
        }}
      >
        <h1
          style={{
            textAlign: 'center',
          }}
        >
          <img
            style={{
              height: '44px',
              marginRight: 16,
            }}
            alt="logo"
            src={logo}
          />
          传慎OA
        </h1>
        <div
          style={{
            marginTop: 12,
            textAlign: 'center',
            marginBottom: 40,
          }}
        >
          极速考勤，快人一步！
        </div>
        <ProFormText
          fieldProps={{
            size: 'large',
            prefix: <MobileOutlined />,
          }}
          name="phone"
          placeholder="请输入手机号"
          rules={[
            {
              required: true,
              message: '请输入手机号!',
            },
            {
              pattern: /^1\d{10}$/,
              message: '不合法的手机号格式!',
            },
          ]}
        />
        <ProFormCaptcha
          fieldProps={{
            size: 'large',
            prefix: <MailOutlined />,
          }}
          captchaProps={{
            size: 'large',
          }}
          phoneName="phone"
          name="captcha"
          rules={[
            {
              required: true,
              message: '请输入验证码',
            },
          ]}
          placeholder="请输入验证码"
          onGetCaptcha={async phone => {
            await waitTime(1000)
            message.success(`手机号 ${phone} 验证码发送成功!`)
          }}
        />
      </ProForm>
    </div>
  )
}

// 方正粗黑宋简体
