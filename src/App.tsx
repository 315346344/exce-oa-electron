// import React from 'react'
// import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
// import { HomePage, LoginPage } from './pages'
// import styles from './App.module.css'
// import { useSelector } from './redux/hooks'

// 私有路由
// const PrivateRoute = ({ component, isAuthenticated, ...rest }) => {
//   const routeComponent = props => {
//     return isAuthenticated ? (
//       React.createElement(component, props)
//     ) : (
//       <Redirect to={{ pathname: '/signIn' }} />
//     )
//   }
//   return <Route render={routeComponent} {...rest} />
// }

// function App() {
  // const jwt = useSelector(s => s.user.token)
  // return (
    // <BrowserRouter>
    //   <Switch>
    //     <Route path="/" component={HomePage} />
    //     <Route path="/login" component={LoginPage} />
    //     {/* <PrivateRoute
    //         path="/testPrivatePage"
    //         isAuthenticated={jwt != null}
    //         component={DemoHomePage}
    //       /> */}
    //   </Switch>
    // </BrowserRouter>
    // <div></div>
  // )
// }

// export default App
