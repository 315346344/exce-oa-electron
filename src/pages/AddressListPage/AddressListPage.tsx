import React, { useContext } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import styles from './AddressListPage.module.css'
import { FrameworkTree, PersonnelList, PersonnelDetail } from '../../components'

// import { appContext } from '../../AppState'

import { Tabs, Empty } from 'antd'
const { TabPane } = Tabs

export const AddressListPage: React.FC = props => {
  // const value = useContext(appContext)
  return (
    <div className={styles.AddressListPageBox}>
      <div className={styles.left}>
        <div className={styles.tree}>
          <Tabs defaultActiveKey="1" centered>
            <TabPane tab="组织架构" key="1">
              <FrameworkTree />
            </TabPane>
            <TabPane tab="客户列表" key="2">
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            </TabPane>
          </Tabs>
        </div>
      </div>

      <div className={styles.center}>
        <Switch>
          <Route
            path="/home/addressList/:personnelListId"
            component={PersonnelList}
          />
          <Redirect from="/home/addressList" to="/addressList/01/01" />
        </Switch>
      </div>

      <div className={styles.right}>
        <Switch>
          <Route
            path="/home/addressList/:personnelListId/:detailId"
            component={PersonnelDetail}
          />
          <Redirect from="/home/addressList" to="/home/addressList/01/01" />
        </Switch>
      </div>
    </div>
  )
}
