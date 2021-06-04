import React from 'react'
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom'
import {
  LoginPage,
  HomePage,
  ChatPage,
  AddressListPage,
  ProjectPage,
  TaskPage,
  AuditPage,
  ClockingInPage,
  ReportPage,
} from '../pages'

const BasicRoute = () => (
  <HashRouter>
    <Switch>
      <Route path="/login" component={LoginPage} />
      <Route
        path="/"
        render={() => (
          <HomePage>
            <Route path="/chat" component={ChatPage} />
            <Route path="/addressList" component={AddressListPage} />
            <Route path="/project" component={ProjectPage} />
            <Route path="/task" component={TaskPage} />
            <Route path="/audit" component={AuditPage} />
            <Route path="/clockingIn" component={ClockingInPage} />
            <Route path="/report" component={ReportPage} />
            {/* <Redirect from="/" to="/chat" /> */}
            <Redirect from="/" to="/login" />
          </HomePage>
        )}
      />
    </Switch>
  </HashRouter>
)

export default BasicRoute
