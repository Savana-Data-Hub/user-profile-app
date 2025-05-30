import { DataProvider } from '@dhis2/app-runtime'
import { CssVariables } from '@dhis2/ui'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider.js'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Router, Route, hashHistory, Redirect } from 'react-router'
import Account from './account/Account.component.js'
import PasswordChangeSuccessDialog from './account/PasswordChangeSuccessDialog.js'
import TwoFactor from './account/twoFactor/TwoFactor.js'
import Snackbar from './layout/Snackbar.component.js'
import AppTheme from './layout/theme.js'
import PersonalAccessTokens from './personalAccessTokens/PersonalAccessTokens.component.js'
import Profile from './profile/Profile.component.js'
import UserSettings from './settings/UserSettings.component.js'
import ViewProfile from './viewProfile/ViewProfile.component.js'

function WrappedApp(props) {
    return (
        <div className="content-wrap">
            {props.children}
        </div>
    )
}
WrappedApp.propTypes = {
    children: PropTypes.any.isRequired,
    routes: PropTypes.array.isRequired,
}

class AppRouter extends Component {
    getChildContext() {
        return {
            d2: this.props.d2,
            muiTheme: AppTheme,
        }
    }

    getDataProviderProps() {
        const baseUrl = this.props.d2.system.systemInfo.contextPath
        const apiUrl = this.props.d2.system.settings.api.baseUrl
        const versionString = apiUrl.split('/').pop()
        const apiVersion = isNaN(parseInt(versionString, 10))
            ? ''
            : versionString

        return { baseUrl, apiVersion }
    }

    render() {
        return (
            <DataProvider {...this.getDataProviderProps()}>
                <CssVariables colors spacers />
                <MuiThemeProvider muiTheme={AppTheme}>
                    <div className="app-wrapper">
                        <Snackbar />
                        <Router history={hashHistory}>
                            <Route component={WrappedApp}>
                                <Route
                                    path="settings"
                                    component={UserSettings}
                                />
                                <Route path="profile" component={Profile} />
                                <Route path="account" component={Account} />
                                <Route path="twoFactor" component={TwoFactor} />
                                <Route
                                    path="passwordChanged"
                                    component={PasswordChangeSuccessDialog}
                                />
                                <Route
                                    path="viewProfile"
                                    component={ViewProfile}
                                />
                                <Route
                                    path="personalAccessTokens"
                                    component={PersonalAccessTokens}
                                />
                                {/* <Route path="aboutPage" component={AboutPage} /> */}
                                <Redirect from="/" to="/viewProfile" />
                            </Route>
                        </Router>
                    </div>
                </MuiThemeProvider>
            </DataProvider>
        )
    }
}

AppRouter.propTypes = { d2: PropTypes.object.isRequired }
AppRouter.childContextTypes = {
    d2: PropTypes.object,
    muiTheme: PropTypes.object,
}

export default AppRouter