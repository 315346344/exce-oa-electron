/**
 * 侧边导航栏
 * 除登录注册外的公用组件
 */
import React, { useRef, useEffect } from 'react'
import styles from './LeftNavBar.module.css'
import { useHistory, useLocation } from 'react-router-dom'

// 引入图片---react不支持img标签src直接导入图片资源
import avatar from '../../assets/avatar.png'

interface imgArrType {
  class: string
  route: string
}

const imgArr: imgArrType[] = [
  { class: '#iconliaotianxuanzhong1', route: 'chat' },
  { class: '#iconziyuan', route: 'addressList' },
  { class: '#iconproject-o', route: 'project' },
  { class: '#iconjob', route: 'task' },
  { class: '#iconshenpi', route: 'audit' },
  { class: '#iconkewukaoqin', route: 'clockingIn' },
  { class: '#icongongzuohuibao', route: 'report' },
]

// icon点击切换选中状态
// 参数：路由，iocn数据，iocn下标，icon父级的DOM元素, 当前路由
const iconShow = (history, data, index, svgEl) => {
  history.push('/' + data.route)

  // 清除所有icon的选中样式
  Array.from(svgEl.current.children).map((item: any, i) => {
    item.className = styles.item
    item.children[0].className.baseVal = 'icon'
  })

  // 点击icon的样式改动
  svgEl.current.children[index].className = styles.item + ' show'
  svgEl.current.children[index].children[0].className.baseVal = 'icon show'
}

export const LeftNavBar: React.FC = () => {
  const location = useLocation()
  const history = useHistory()
  const svgEl = useRef<any>(null)

  // 刷新页面时icon状态对应显示
  useEffect(() => {
    const path = location.pathname.substr(1)

    Array.from(svgEl.current.children).map((item: any, index) => {
      if (path.indexOf('chat') !== -1 && index === 0) {
        item.className = styles.item + ' show'
        item.children[0].className.baseVal = 'icon show'
      } else if (path.indexOf('addressList') !== -1 && index === 1) {
        item.className = styles.item + ' show'
        item.children[0].className.baseVal = 'icon show'
      } else if (path.indexOf('project') !== -1 && index === 2) {
        item.className = styles.item + ' show'
        item.children[0].className.baseVal = 'icon show'
      } else if (path.indexOf('task') !== -1 && index === 3) {
        item.className = styles.item + ' show'
        item.children[0].className.baseVal = 'icon show'
      } else if (path.indexOf('audit') !== -1 && index === 4) {
        item.className = styles.item + ' show'
        item.children[0].className.baseVal = 'icon show'
      } else if (path.indexOf('clockingIn') !== -1 && index === 5) {
        item.className = styles.item + ' show'
        item.children[0].className.baseVal = 'icon show'
      } else if (path.indexOf('report') !== -1 && index === 6) {
        item.className = styles.item + ' show'
        item.children[0].className.baseVal = 'icon show'
      }
    })
  }, [])

  return (
    <div className={styles.side}>
      <img className={styles.avatar} src={avatar} />
      <div className={styles.itemArr} ref={svgEl}>
        {imgArr.map((item, index) => {
          if (index === 0) {
            return (
              <span
                className={styles.item + ' show'}
                key={index}
                onClick={() => iconShow(history, item, index, svgEl)}
              >
                <svg className="icon show" aria-hidden="true">
                  <use xlinkHref={item.class}></use>
                </svg>
              </span>
            )
          } else {
            return (
              <span
                className={styles.item}
                key={index}
                onClick={() => iconShow(history, item, index, svgEl)}
              >
                <svg className="icon" aria-hidden="true">
                  <use xlinkHref={item.class}></use>
                </svg>
              </span>
            )
          }
        })}
        <span
          className={styles.item}
          onClick={() => {
            window.location.href = 'https://www.baidu.com'
          }}
        >
          <svg className="icon" aria-hidden="true">
            <use xlinkHref="#iconapphoutaiguanli"></use>
          </svg>
        </span>
      </div>
    </div>
  )
}
