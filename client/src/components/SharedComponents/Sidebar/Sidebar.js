import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Menu } from 'antd';
import {
    SettingOutlined,
    RobotOutlined,
    HomeOutlined,
    SolutionOutlined,
} from '@ant-design/icons';

const { SubMenu } = Menu;

const Sidebar = ({
    history,
}) => {
    const curPage = history.location.pathname.replace("/", "")

    return (
        <Menu
            defaultSelectedKeys={curPage}
            defaultOpenKeys={(curPage === "rule" || curPage === "rules") ? ['ruleMenu'] : []}
            mode="inline"
            theme="light"
            inlineCollapsed={false}
        >
            <Menu.ItemGroup key="pages" title="PAGES">
                <Menu.Item key="bot" onClick={() => { history.push('/bot') }} icon={<RobotOutlined />}>
                    Bots
                </Menu.Item>
                <Menu.Item key="room" onClick={() => { history.push('/room') }} icon={<HomeOutlined />}>
                    Rooms
                </Menu.Item>
                <SubMenu key="ruleMenu" icon={<SolutionOutlined />} title="Rules">
                    <Menu.Item key="rule" onClick={() => { history.push('/rule') }}>
                        New Rule
                    </Menu.Item>
                    <Menu.Item key="rules" onClick={() => { history.push('/rules') }}>
                        Existing Rules
                    </Menu.Item>
                </SubMenu>
                <Menu.Item key="settings" onClick={() => { history.push('/settings') }} icon={<SettingOutlined />}>
                    Settings
                </Menu.Item>
            </Menu.ItemGroup>
        </Menu>
    )
}

export default withRouter(connect(
    null,
    {}
)(Sidebar))