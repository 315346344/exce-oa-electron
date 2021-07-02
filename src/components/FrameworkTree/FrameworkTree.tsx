/**
 * 此组件为组织结构树+搜索框
 */

import React, { useState, useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import styles from './FrameworkTree.module.css'
import { Tree, Input } from 'antd'
import axios from '../../http/http'

import { SearchOutlined } from '@ant-design/icons'

import { appSetStateContext } from '../../AppState'

// let gData = [
//   {
//     title: '上海传慎',
//     key: '上海传慎',
//     children: [
//       {
//         title: '研发部',
//         key: '研发部',
//         children: [
//           {
//             title: '研发子部',
//             key: '研发子部',
//           },
//         ],
//       },
//       {
//         title: '后勤部',
//         key: '后勤部',
//       },
//       {
//         title: '人事部',
//         key: '人事部',
//       },
//       {
//         title: '111',
//         key: '111',
//       },
//       {
//         title: '222',
//         key: '222',
//       },
//       {
//         title: '333',
//         key: '333',
//       },
//       {
//         title: '444',
//         key: '444',
//       },
//       {
//         title: '555',
//         key: '555',
//       },
//       {
//         title: '666',
//         key: '666',
//       },
//       {
//         title: '777',
//         key: '777',
//       },
//       {
//         title: '888',
//         key: '888',
//       },
//       {
//         title: '999',
//         key: '999',
//       },
//       {
//         title: '000',
//         key: '000',
//       },
//       {
//         title: '101',
//         key: '101',
//       },
//       {
//         title: '102',
//         key: '102',
//       },
//       {
//         title: '103',
//         key: '103',
//       },
//       {
//         title: '104',
//         key: '104',
//       },

//       {
//         title: '105',
//         key: '105',
//       },
//       {
//         title: '106',
//         key: '106',
//       },
//       {
//         title: '107',
//         key: '107',
//       },
//       {
//         title: '108',
//         key: '108',
//       },
//       {
//         title: '109',
//         key: '109',
//       },
//       {
//         title: '110',
//         key: '110',
//       },

//       {
//         title: '201',
//         key: '201',
//       },
//       {
//         title: '202',
//         key: '202',
//       },
//       {
//         title: 'end',
//         key: 'end',
//       },
//     ],
//   },
// ]

let gData = []

export const FrameworkTree: React.FC = () => {
  const setState = useContext(appSetStateContext)
  const history = useHistory()
  const [expandedKeys, setExpandedKeys] = useState(['上海传慎'])
  const [searchValue, setSearchValue] = useState('')
  const [autoExpandParent, setAutoExpandParent] = useState(true)
  // const [treeData, setTreeData] = useState<any>([])
  // table自适应窗口大小高度
  let [tableHeight, setTableHeight] = useState<any>(560)

  // useEffect(() => {
  //   axios.get('depts/tree').then(res => {
  //     const data = res.data
  //     if (data.code === 0) {
  //       console.log(data.data)
  //       // setMemberData(data.data.list)
  //       // setMemberTotalData(data.data.total_count)
  //       gData = data.data
  //       // generateList(gData)
  //     }
  //   })
  // }, [])

  const changeResize = () => {
    setTableHeight(document.documentElement.clientHeight - 24 - 46 - 16 - 32)
  }
  useEffect(() => {
    window.addEventListener('resize', changeResize)
  })

  // 占位
  const dataList: any = []

  const generateList = data => {
    for (let i = 0; i < data.length; i++) {
      const node = data[i]
      const key = data[i].key
      dataList.push({ key, title: key })
      // console.log(node)
      if (node.children) {
        // console.log(node)
        generateList(node.children)
      }
    }
  }
  generateList(gData)

  const getParentKey = (key, tree) => {
    let parentKey
    for (let i = 0; i < tree.length; i++) {
      const node = tree[i]
      if (node.children) {
        if (node.children.some(item => item.key === key)) {
          parentKey = node.key
        } else if (getParentKey(key, node.children)) {
          parentKey = getParentKey(key, node.children)
        }
      }
    }
    return parentKey
  }

  const onExpand = expandedKeys => {
    setExpandedKeys(expandedKeys)
    setAutoExpandParent(false)
  }

  const onChange = e => {
    const { value } = e.target
    const expandedKeys = dataList
      .map(item => {
        if (item.title.indexOf(value) > -1) {
          return getParentKey(item.key, gData)
        }
        return null
      })
      .filter((item, i, self) => item && self.indexOf(item) === i)
    setExpandedKeys(expandedKeys)
    setSearchValue(value)
    setAutoExpandParent(true)
  }

  // 点击树节点触发
  const onSelect = (selectedKeys: any, info: any) => {
    // console.log(selectedKeys, info, history)
    if (setState) {
      setState(state => {
        return {
          ...state,
          addressListRouteId: selectedKeys[0].toString(),
        }
      })
    }
    history.push('/home/addressList/' + selectedKeys + '/01')
  }

  const loop = data =>
    data.map(item => {
      console.log(item)
      // console.log(item.title)

      const index = item.title.indexOf(searchValue)
      const beforeStr = item.title.substr(0, index)
      const afterStr = item.title.substr(index + searchValue.length)
      const title =
        index > -1 ? (
          <span>
            {beforeStr}
            <span
              className="site-tree-search-value"
              style={{ color: '#1890FF' }}
            >
              {searchValue}
            </span>
            {afterStr}
          </span>
        ) : (
          <span>{item.title}</span>
        )
      if (item.children) {
        return { title, key: item.key, children: loop(item.children) }
      }

      return {
        title,
        key: item.key,
      }
    })
  return (
    <div>
      <Input
        placeholder="搜索"
        prefix={<SearchOutlined />}
        onChange={onChange}
      />
      <Tree
        height={tableHeight}
        blockNode
        onSelect={onSelect}
        onExpand={onExpand}
        expandedKeys={expandedKeys}
        autoExpandParent={autoExpandParent}
        treeData={loop(gData)}
      />
    </div>
  )
}
