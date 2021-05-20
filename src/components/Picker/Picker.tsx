/**
 * 日期（月）+ 组织架构选择器
 * 一般作为报表页面的header使用
 */
import React, { useState } from 'react'
import styles from './Picker.module.css'

import avatar from '../../assets/header.png'

import { DatePicker, Space, TreeSelect } from 'antd'

const { TreeNode } = TreeSelect

// 获取日期
function getDay(date, dateString) {
  console.log(date, dateString)
}

export const Picker: React.FC = () => {
  const [value, setValue] = useState(undefined)
  const onChange = () => {
    setValue(value)
  }
  return (
    <div className={styles.head}>
      <div className={styles.time}>
        <span className={styles.text}>时间：</span>
        <Space className={styles.picker} direction="vertical">
          <DatePicker onChange={getDay} placeholder="最近一月" picker="month" />
        </Space>
      </div>
      <div className={styles.personnel}>
        <div className={styles.text}>人员/部门：</div>
        <TreeSelect
          className={styles.check}
          showSearch
          style={{ width: '100%' }}
          value={value}
          dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
          placeholder="全公司"
          allowClear
          treeDefaultExpandAll
          onChange={onChange}
        >
          <TreeNode value="上海传慎" title="上海传慎">
            <TreeNode value="技术部" title="技术部">
              <TreeNode value="张三" title="张三" />
              <TreeNode value="赵四" title="赵四" />
            </TreeNode>
            <TreeNode value="人事部" title="人事部">
              <TreeNode
                value="赵六"
                title={
                  <>
                    <img src={avatar} style={{ width: '18px', height: '18px' }} alt="" />
                    <span style={{ marginLeft: '4px' }}>赵六</span>
                  </>
                }
              />
            </TreeNode>
          </TreeNode>
        </TreeSelect>
      </div>
    </div>
  )
}
