import React from 'react'
// import axios from 'axios'
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

// 挂载全局axios
// (React.Component.prototype as any).$axios = axios

// const BasicRoute = () => (
//   <BrowserRouter>
//     <Switch>
//       <Route path="/login" component={LoginPage} />
//       <Route
//         path="/"
//         render={() => (
//           <HomePage>
//             <Route path="/chat" component={ChatPage} />
//             <Route path="/addressList" component={AddressListPage} />
//             <Route path="/project" component={ProjectPage} />
//             <Route path="/task" component={TaskPage} />
//             <Route path="/audit" component={AuditPage} />
//             <Route path="/clockingIn" component={ClockingInPage} />
//             <Route path="/report" component={ReportPage} />
//             <Redirect from="/" to="/chat" />
//             {/* <Redirect from="/" to="/login" /> */}
//           </HomePage>
//         )}
//       />
//     </Switch>
//   </BrowserRouter>
// )

const MainPage = () => {
  return (
    <>
      <HomePage>
        {/*<Route exact path="/login" component={LoginPage} />*/}
        <Route path="/home/chat" component={ChatPage} />
        <Route path="/home/addressList" component={AddressListPage} />
        <Route path="/home/project" component={ProjectPage} />
        <Route path="/home/task" component={TaskPage} />
        <Route path="/home/audit" component={AuditPage} />
        <Route path="/home/clockingIn" component={ClockingInPage} />
        <Route path="/home/report" component={ReportPage} />
      </HomePage>
    </>
  )
}

const BasicRoute = () => (
  <HashRouter>
    <Switch>
      <Route path="/login" component={LoginPage} />
      <Route path="/home" component={MainPage} />
      <Redirect exact from="/" to="/login" />
    </Switch>
  </HashRouter>
)

export default BasicRoute
