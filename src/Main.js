import {
    UserOutlined,
    SettingOutlined,
    LogoutOutlined,
    FormOutlined,
    DownloadOutlined,
    FileTextOutlined,
    AreaChartOutlined,
    MonitorOutlined,
    ImportOutlined,
    TeamOutlined,
    CheckCircleOutlined,
    BarsOutlined,
    MenuOutlined,
    CarOutlined
} from '@ant-design/icons';
import { useDataQuery } from '@dhis2/app-runtime';
import MenuIcon from '@mui/icons-material/Menu';
import { Button, Layout, Menu, Dropdown, Tabs, Avatar } from 'antd';
import React, { useState } from 'react';
import appActions from './app.actions.js';
import classes from './App.module.css';
import AppWrapper from './AppWrapper.js';
import i18n from './locales/index.js';

const { Sider, Content } = Layout;

const ME_QUERY = {
    me: {
        resource: 'me',
        params: {
            fields: [
                'firstName',
                'surname',
                'email',
            ]
        }
    }
};

const tabItems = [
    {
        key: 'profile',
        label: i18n.t('User profile'),
    },
    {
        key: 'account',
        label: i18n.t('Account settings'),
    },
    {
        key: 'twoFactor',
        label: i18n.t('Two factor authentication'),
    },
    {
        key: 'viewProfile',
        label: i18n.t('Full profile'),
    },
];

const Main = () => {
    const [collapsed, setCollapsed] = useState(false);
    // Track the currently open submenu
    const [openKeys, setOpenKeys] = useState(['3']);

    const onOpenChange = (keys) => {
        const latestOpenKey = keys.find(key => openKeys.indexOf(key) === -1);

        if (latestOpenKey) {
            // If there's a new key being opened, only open that one
            setOpenKeys([latestOpenKey]);
        } else {
            // If we're closing a submenu, close everything
            setOpenKeys([]);
        }
    };

    const { loading, error, data } = useDataQuery(ME_QUERY);

    if (loading) {
        return null;
    }
    if (error) {
        return null;
    }

    const { firstName, surname, email: userEmail } = data.me;
    const email = `${userEmail}`
    const fullName = `${firstName} ${surname}`;
    const initials = `${firstName?.[0] || ''}${surname?.[0] || ''}`;


    const getSelectedKey = () => {
        const currentUrl = window.location.hash;

        if (currentUrl.includes('/profile')) {
            return '9';
        } else if (currentUrl.includes('/account')) {
            return '10';
        }

        return '';
    };

    const profileMenu = (
        <Menu selectedKeys={['9', '10']}>
            <Menu.Item key="9" icon={<SettingOutlined />}>
                <a href="/sims-web-user-profile/#/profile">Settings</a>
            </Menu.Item>
            <Menu.Item key="10" icon={<UserOutlined />}>
                <a href="/sims-web-user-profile/#/account">Account</a>
            </Menu.Item>
            <Menu.Item key="11" icon={<LogoutOutlined />}>
                <a href="/dhis-web-commons-security/logout.action">Logout</a>
            </Menu.Item>
        </Menu>
    );

    const dataCreationItems = [
        {
            key: '2.1',
            icon: <BarsOutlined />,
            label: <a href="/sims-web-maintenance/#/list/organisationUnitSection/organisationUnit">Organisation Units</a>,
        },
        {
            key: '2.2',
            icon: <BarsOutlined />,
            label: <a href="/sims-web-maintenance/#/list/programSection/program">Programs</a>,
        },
        {
            key: '2.3',
            icon: <BarsOutlined />,
            label: <a href="/sims-web-maintenance/#/list/dataElementSection/dataElement">Data Elements</a>,
        },
        {
            key: '2.4',
            icon: <BarsOutlined />,
            label: <a href="/sims-web-maintenance/#/list/dataSetSection/dataSet">Data Sets</a>,
        },
    ];

    const adminCentreItems = [
        {
            key: '5.1',
            label: <a href="/sims-web-user/">User Management</a>,
            icon: <TeamOutlined />,
        },
        {
            key: '5.2',
            label: <a href="/sims-web-settings/">System Settings</a>,
            icon: <SettingOutlined />,
        },
    ];

    const dataCollectionItems = [
        {
            key: '3.1',
            label: <a href="/sims-web-capture/">Forms</a>,
            icon: <FormOutlined />,
        },
        {
            key: '3.2',
            label: <a href="/sims-web-aggregate-data-entry/">Spreadsheets</a>,
            icon: <FileTextOutlined />,
        },
        {
            key: '3.3',
            label: <a href="/sims-web-import-export/">Data Import & Export</a>,
            icon: <DownloadOutlined />,
        },
    ];

    return (
        <Layout style={{ height: '100vh' }}>
            {/* Sidebar */}
            <Sider
                trigger={null}
                collapsible
                width="20%"
                collapsedWidth={80}
                collapsed={collapsed}
                onCollapse={(collapsedState) => setCollapsed(collapsedState)}
                breakpoint="lg"
                onBreakpoint={(broken) => setCollapsed(broken)}
                className={classes.sidebar}
                style={{
                    padding: '10px 0',
                    transition: 'width 0.2s',
                    background: '#003D8F',
                    borderRight: '1px solid #d9d9d9',
                    overflow: 'hidden',
                }}
            >
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    background: '#003D8F',
                    height: '100%',
                }}>
                    {/* Top Section */}
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '10px',

                        flexShrink: 0
                    }}>
                        <div className={classes.logo} style={{
                            flexDirection: collapsed && 'column-reverse',

                        }}>
                            <Button
                                type="text"
                                className=''
                                icon={<MenuOutlined fontSize="medium" />}
                                onClick={() => setCollapsed(!collapsed)}
                                style={{
                                    width: '16px',
                                    height: '16px',
                                    color: '#fff',
                                }}
                            />
                            <div>
                                <img
                                    src={process.env.PUBLIC_URL + "/sims-sidebar-logo.png"}
                                    alt="SIMS"
                                    style={{
                                        width: collapsed ? '30px' : '40px',
                                        height: collapsed ? '30px' : '40px',
                                        objectFit: 'cover',
                                        transition: 'all 0.2s',
                                        filter: "brightness(0) invert(1)"
                                    }}
                                />
                            </div>
                        </div>

                    </div>

                    {/* Scrollable Menu Section */}
                    <div style={{
                        overflowY: 'auto',
                        overflowX: 'hidden',
                        display: 'flex',
                        flexDirection: 'column',
                        height: '100%',
                    }}>
                        <Menu
                            openKeys={openKeys}
                            onOpenChange={onOpenChange}
                            style={{
                                height: '100%',
                                overflowY: 'auto'
                            }}
                            className={classes.menu} // Apply the custom styles from the CSS module
                            mode="inline"
                            inlineCollapsed={collapsed}
                        >
                            <Menu.Item key="1" icon={<MonitorOutlined />}>
                                <a href="/sims-web-usage-analytics/" >Overview</a>
                            </Menu.Item>

                            <Menu.Divider />

                            <Menu.SubMenu
                                key={'2'}
                                icon={<CheckCircleOutlined />}
                                title="Activation"
                            >
                                {dataCreationItems.map(item => (
                                    <Menu.Item key={item.key} icon={item.icon}>
                                        {item.label}
                                    </Menu.Item>
                                ))}
                            </Menu.SubMenu>

                            <Menu.Divider />

                            <Menu.SubMenu
                                key={'3'}
                                icon={<ImportOutlined />}
                                title="Data Collection"
                            >
                                {dataCollectionItems.map(item => (
                                    <Menu.Item key={item.key} icon={item.icon}>
                                        {item.label}
                                    </Menu.Item>
                                ))}

                            </Menu.SubMenu>

                            <Menu.Divider />

                            <Menu.Item key="4" icon={<AreaChartOutlined />}>
                                <a href="/sims-web-dashboard/" >Visualization</a>
                            </Menu.Item>

                            <Menu.Divider />

                            <Menu.SubMenu
                                key={'5'}
                                icon={<UserOutlined />}
                                title="Admin Centre"
                                style={{
                                    marginTop: 'auto',
                                }}
                            >
                                {adminCentreItems.map(item => (
                                    <Menu.Item key={item.key} icon={item.icon}>
                                        {item.label}
                                    </Menu.Item>
                                ))}
                            </Menu.SubMenu>
                        </Menu>
                    </div>

                    {/* Modern Profile Section */}
                    <div>
                        {profileMenu}
                    </div>
                </div>
            </Sider>

            {/* Main Layout */}
            <Layout style={{
                padding: 15,
                display: 'flex',
                flexDirection: 'column',
                height: '100vh'
            }}>
                <div style={{
                    padding: 10,
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom:'10px' }}>
                        <UserOutlined style={{ fontSize: 24, color: '#5DA9E9' }} />
                        <h2 className={classes.heading}>User Profile Settings</h2>
                    </div>
                    <p style={{ fontSize: '14px', marginTop: 4, color: '#606060' }}>
                        Manage User Profile Settings
                    </p>
                </div>

                <div style={{ padding: '10px' }}>
                    <Tabs
                        tabBarGutter={10}
                        size="large"
                        type='card'
    
                        items={tabItems}
                        onChange={appActions.setCategory}
                    />
                </div>

                <Content
                    style={{
                        minHeight: 0,
                        flexGrow: 1,
                        overflowY: 'auto',
                        margin: '15px',
                        paddingX: 15,
                        minHeight: 280,
                        border: '1px solid #D7D7D7',
                        background: '#fff',
                        borderRadius: '8px',
                    }}
                >
                    <AppWrapper />
                </Content>
            </Layout>
        </Layout>
    );
};

export default Main;
