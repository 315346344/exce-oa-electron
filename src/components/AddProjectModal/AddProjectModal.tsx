/**
 * 单选组件
 * 用于在组织架构中选人
 * 父组件中调用showModal打开此组件
 * <AddProjectModal ref={childrenRef} />
 * const childrenRef = useRef<any>(null)
 * const showModal = () => childrenRef.current.showModal()
 */
import React, { useState, useImperativeHandle, forwardRef } from 'react'
import styles from './AddProjectModal.module.css'

import { Modal, Input } from 'antd'

export const AddProjectModal = forwardRef((props, ref) => {
  const [isModalVisible, setIsModalVisible] = useState(false)

  const handleOk = () => {
    setIsModalVisible(false)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  useImperativeHandle(ref, () => ({
    showModal: () => {
      setIsModalVisible(true)
    },
  }))

  return (
    <>
      <Modal
        title="新建项目"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        closable={false}
        width={400}
      >
        <Input placeholder="请填写项目名称" />
      </Modal>
    </>
  )
})
