/**
 * 此组件为人员列表
 * 联系人页面的第二级选择列表
 */
import React, { useState, useRef, useEffect, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import styles from './PersonnelList.module.css'
// import avatar from './../../assets/avatar2.png'
import axios from '../../http/http'

import { appContext, appSetStateContext } from '../../AppState'

export const PersonnelList: React.FC = () => {
  const [memberData, setMemberData] = useState<any>([])
  const [memberTotalData, setMemberTotalData] = useState<any>([])
  const value = useContext(appContext)
  const history = useHistory()
  const itemEL = useRef<any>(null)

  // useEffect(() => {
  //   const access_token = window.sessionStorage.getItem('access_token')
  //   const refresh_token = window.sessionStorage.getItem('refresh_token')

  //   fetchData({
  //     method: 'post',
  //     url: '/users/refreshlogin',
  //     params: { access_token, refresh_token },
  //   })
  // }, [])

  // useEffect(() => {
  //   if (response === null) return
  //   console.log(response)
  // }, [response])

  useEffect(() => {
    axios.get('users/addrbooks').then(res => {
      const data = res.data
      if (data.code === 0) {
        setMemberData(data.data.list)
        setMemberTotalData(data.data.total_count)
      }
    })

    axios.get('depts/tree').then(res => {
      const data = res.data
      if (data.code === 0) {
        console.log(data)

        // setMemberData(data.data.list)
        // setMemberTotalData(data.data.total_count)
      }
    })
  }, [])

  const checkItem = (id, index) => {
    // 清除所有icon的选中样式
    Array.from(itemEL.current.children).map((item: any, i) => {
      item.className = styles.list
    })

    // 点击icon的样式改动
    itemEL.current.children[index].className =
      styles.list + ' PersonnelListClick'

    // 跳转路由
    history.push('/home/addressList/' + value.addressListRouteId + '/' + id)
  }
  return (
    <div className={styles.box}>
      <div className={styles.title}>部门成员（{memberTotalData}人）</div>
      <div className={styles.ul} ref={itemEL}>
        {memberData.map((item, index) => {
          if (index === 0) {
            return (
              <div
                className={styles.list + ' PersonnelListClick'}
                key={index}
                onClick={() => {
                  checkItem(item.id, index)
                }}
              >
                {/* <img className={styles.avatar} src={avatar}></img> */}
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    lineHeight: '32px',
                    textAlign: 'center',
                    borderRadius: '50%',
                    background: '#5B92FF',
                    color: '#fff',
                    margin: '10px 12px 0 15px',
                  }}
                >
                  {item.real_name_initials}
                </div>
                <div className={styles.text}>{item.real_name}</div>
              </div>
            )
          } else {
            return (
              <div
                className={styles.list}
                key={index}
                onClick={() => {
                  checkItem(item.id, index)
                }}
              >
                {/* <img className={styles.avatar} src={avatar}></img> */}
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    lineHeight: '32px',
                    textAlign: 'center',
                    borderRadius: '50%',
                    background: '#5B92FF',
                    color: '#fff',
                    margin: '10px 12px 0 15px',
                  }}
                >
                  {item.real_name_initials}
                </div>
                <div className={styles.text}>{item.real_name}</div>
              </div>
            )
          }
        })}
      </div>
    </div>
  )
}
