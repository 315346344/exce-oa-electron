import React, { useState, useEffect, useRef } from 'react'
import styles from './ProjectDoc.module.css'
import { Input } from 'antd'
import iconSave from '../../assets/project-save.png'
import iconRedact from '../../assets/project-editor.png'

import E from 'wangeditor'

let editor

let isRedact = false

export const ProjectDoc: React.FC = () => {
  const [content, setContent] = useState('')
  const redactEl = useRef<any>(null)
  const iconEl = useRef<any>(null)

  useEffect(() => {
    isRedact = false
    // 分离模式，传入两个元素
    editor = new E('#toolbar-container', '#text-container')

    editor.config.onchange = newHtml => {
      setContent(newHtml)
    }

    // 配置图片上传服务器
    // editor.config.uploadImgServer = "/upload-img";
    // 将图片设置文base64，与图片上传服务器二选一
    editor.config.uploadImgShowBase64 = true

    // 配置全屏功能按钮是否展示
    // editor.config.showFullScreen = true

    /**一定要创建 */
    editor.create()

    // 默认隐藏编辑菜单 + 只读模式
    editor.$toolbarElem.elems[0].className += ' toolbarHidden'
    editor.disable()

    // 重新设置编辑器内容
    editor.txt.html('<p>从后台获取的内容</p>')

    return () => {
      // 组件销毁时销毁编辑器  注：class写法需要在componentWillUnmount中调用
      editor.destroy()
    }
  }, [])

  // 获取html方法2
  function getHtml1() {
    alert(editor.txt.html())
  }

  // 获取text
  function getText() {
    alert(editor.txt.text())
  }

  /**
   * 切换编辑模式
   * - 显示编辑菜单
   * - 编辑按钮更换为保存
   * - 相应icon更换
   * - 文档开启只读
   */
  const redact = () => {
    if (!isRedact) {
      isRedact = !isRedact

      const toolbarStyle = editor.$toolbarElem.elems[0].className.replace(
        / toolbarHidden/g,
        '',
      )
      editor.$toolbarElem.elems[0].className = toolbarStyle

      redactEl.current.innerText = '保存'
      iconEl.current.innerHTML = `<img src= ${iconSave}  />`

      editor.enable()
    } else {
      isRedact = !isRedact

      editor.$toolbarElem.elems[0].className += ' toolbarHidden'

      redactEl.current.innerText = '编辑'
      iconEl.current.innerHTML = `<img src= ${iconRedact}  />`

      editor.disable()
    }
  }

  return (
    <div className={styles.ProjectDocBox}>
      <Input
        placeholder="xxxx接口文档"
        size="large"
        bordered={false}
        value="xxxx接口文档"
      />
      <span onClick={redact}>
        <span className={styles.icon} ref={iconEl}>
          <img src={iconRedact} />
        </span>
        <span style={{ marginLeft: '4px', cursor: 'pointer' }} ref={redactEl}>
          编辑
        </span>
      </span>
      <div id="toolbar-container" className={styles.toolbar}></div>

      <div id="text-container" className={styles.text}></div>
    </div>
  )
}
