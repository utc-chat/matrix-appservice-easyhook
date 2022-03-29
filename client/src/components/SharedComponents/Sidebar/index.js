import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import MenuSidebar from './Sidebar';
import "antd/dist/antd.css";

const Sidebar = () => {

  return (
    <div style={{ padding: 0 }} className="fixed_sidebar col-md-2 d-md-block bg-light sidebar">
      <div style={{ padding: 0 }} className="sidebar-sticky" >
        <MenuSidebar />
      </div>
    </div >
  )
}

Sidebar.defaultProps = {
  curPage: "products"
}

export default withRouter(connect(
  null,
  {}
)(Sidebar))