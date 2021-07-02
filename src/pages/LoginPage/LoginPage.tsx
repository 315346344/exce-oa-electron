import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import styles from './LoginPage.module.css'
// import useAxios from '../../hooks/UseAxios'
import axios from '../../http/http'
import jwt_decode from 'jwt-decode'

import { message, Form } from 'antd'
import ProForm, { ProFormText, ProFormCaptcha } from '@ant-design/pro-form'
import { MobileOutlined, MailOutlined } from '@ant-design/icons'

import logo from '../../assets/login-logo.png'

import max from '../../assets/max.png'
import min from '../../assets/min.png'
import cls from '../../assets/cls.png'

const ipc = window.require('electron').ipcRenderer

// 改变窗口大小
const changeApp = () => {
  ipc.send('login')
}
// 关闭app
const closeApp = () => {
  ipc.send('close-app')
}
// 最小化app
const minApp = () => {
  ipc.send('min-app')
}
// 最大化app
// const maxApp = () => {
//   ipc.send('max-app')
// }

const waitTime = (time: number = 100) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(true)
    }, time)
  })
}

export const LoginPage = () => {
  const [form] = Form.useForm()
  const history = useHistory()
  // const { response, fetchData }: any = useAxios()

  // useEffect(() => {
  //   if (response === null) return
  // if (response.code === 0) {
  //   // 获取token
  //   window.sessionStorage.setItem('access_token', response.data.access_token)
  //   window.sessionStorage.setItem(
  //     'refresh_token',
  //     response.data.refresh_token,
  //   )
  //   // 解析token获取失效时间
  //   const decoded: any = jwt_decode(response.data.access_token)
  //   window.sessionStorage.setItem('exp', decoded.exp)
  //   // 跳转主窗口，改变窗口大小
  //   history.push('/home/chat/01')
  //   changeApp()
  // } else {
  //   // 重置表单and错误提示
  //   form.resetFields()
  //   message.warning(`用户名或密码错误，请重新输入！`)
  // }
  // }, [response])

  // const onFinish = async params => {
  //   params['client_type'] = 0
  //   await fetchData({
  //     method: 'post',
  //     url: '/users/login',
  //     params,
  //   })
  // }

  const onFinish = async params => {
    params['client_type'] = 0
    const { data }: any = await axios.post('/users/login', params)
    if (data.code === 0) {
      // 获取token
      window.sessionStorage.setItem('access_token', data.data.access_token)
      window.sessionStorage.setItem('refresh_token', data.data.refresh_token)
      // 解析token获取失效时间
      const decoded: any = jwt_decode(data.data.access_token)
      window.sessionStorage.setItem('exp', (decoded.exp * 1000).toString())
      // 跳转主窗口，改变窗口大小
      history.push('/home/chat/01')
      changeApp()
    } else {
      // 重置表单and错误提示
      form.resetFields()
      message.warning(`用户名或密码错误，请重新输入！`)
    }
  }

  return (
    <div className={styles.loginBox}>
      <div className={styles.winOpera}>
        <img
          src={min}
          style={{ padding: '0 12px' }}
          className={styles.operaImg}
          onClick={minApp}
        />

        <img
          src={max}
          style={{ padding: '0 12px' }}
          className={styles.operaImg}
          // onClick={maxApp}
        />

        <img
          src={cls}
          style={{ padding: '0 20px 0 10px' }}
          className={styles.operaImg}
          onClick={closeApp}
        />
      </div>

      <div className={styles.LoginPageBox}>
        <ProForm
          onFinish={onFinish}
          form={form}
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
            name="username"
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
          <ProFormText.Password
            fieldProps={{
              size: 'large',
              prefix: <MobileOutlined />,
            }}
            name="password"
            placeholder="请输入密码"
            rules={[
              {
                required: true,
                message: '请输入密码!',
              },
              {
                min: 6,
                message: '密码最短6位!',
              },
            ]}
          />
          {/* <ProFormCaptcha
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
          /> */}
        </ProForm>
      </div>
    </div>
  )
}
