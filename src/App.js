import './App.css'
import React, { useContext } from 'react'
import { Route, BrowserRouter, Switch } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import ApplicationForm from './components/ApplicationPages/ApplicationForm'
import SuccesApplicationPage from './components/ApplicationPages/SuccesApplicationPage'
import ApplicationQuestion from './components/ApplicationPages/ApplicationQuestion'
import AdminLogin from './components/AdminPage/AdminLogin'
import Application from './components/ApplicationPages/Application'
import AdminApproveList from './components/AdminPage/AdminApproveList'
import AdminApproveRecord from './components/AdminPage/AdminApproveRecord'
import ApplicationNotFound from './components/ApplicationPages/ApplicationNotFound'
import AdminApprovedAlert from './components/AdminPage/AdminApprovedAlert'
import AdminNavBar from './components/Navbar/AdminNavbar'

import GlobalContext from './context/GlobalState'

function App() {
  return (
    <GlobalContext>
      <BrowserRouter>
        <div>
          <AdminNavBar></AdminNavBar>
          <Navbar />
       
           <Route path={'/'} component={ApplicationForm} exact />
          <Route path={'/basvuru-olustur'} component={ApplicationForm} />
          <Route
            exact
            path={'/basvuru-sorgula'}
            component={ApplicationQuestion}
          />
          <Route
            path={'/basvuru-basarili/:id'}
            component={SuccesApplicationPage}
          />
          <Route path={'/basvuru/:id'} component={Application} />

          <Route exact path={'/admin'} component={AdminLogin} />
          <Route
            exact
            path={'/admin/basvuru-listesi'}
            component={AdminApproveList}
          />
          <Route path={'/admin/basvuru/:id'} component={AdminApproveRecord} />
          <Route path={'/basvuru-notfound'} component={ApplicationNotFound} />
          <Route path={'/admin/approved:id'} component={AdminApprovedAlert} />
        </div>
      </BrowserRouter>
    </GlobalContext>
  )
}

export default App
