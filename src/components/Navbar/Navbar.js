import React, { Component } from "react";
import "./Navbar.css";
import "antd/dist/antd.css";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import LoginModal from "../LoginModal/LoginModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import { Layout, Menu, Icon, Button } from "antd";
import SideBar from "../Sidebar/Sidebar";
import { openLoginModal } from "../../redux/actions/authActions";
import Settings from "../Settings/Settings";
import DropdownMenu from "../DropdownMenu/DropdownMenu";
import UserDashboard from "../UserDashboard/UserDashboard";
import VendorDashboard from "../VendorDashboard/VendorDashboard";
import VendorSalesPage from "../VendorSalesPage/VendorSalesPage";
import AdminNavbar from "../Admin/AdminNavbar";
import Categories from "../Admin/Categories";
import Users from "../Admin/Users";
import Slideshow from "../Slideshow/Slideshow";
import CategoryWiseServices from "../CategoryWiseServices/CategoryWiseServices";
import Service from "../Service/Service";
import TopVendors from "../topVendors/topvendors";

const { Header, Content } = Layout;

class Navbar extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    openLoginModal: PropTypes.func.isRequired
  };
  state = {
    collapsed: true
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };

  openLoginModal = () => {
    this.props.openLoginModal();
  };

  render() {
    const {
      isAuthenticated,
      user,
      openloginModal,
      openregisterModal
    } = this.props.auth;

    return (
      <Router>
        <Layout>
          <Header
            style={{ position: "fixed", zIndex: 99, width: "100%" }}
            className="header"
          >
            {isAuthenticated ? (
              <Menu
                theme="dark"
                mode="horizontal"
                style={{ lineHeight: "60px" }}
              >
                <Menu.Item key="1" className="left">
                  <Icon
                    className="trigger"
                    type={this.state.collapsed ? "menu-unfold" : "menu-fold"}
                    onClick={this.toggle}
                  />
                </Menu.Item>
                <Menu.Item key="2" className="left">
                  <Link to="/">Sahaayak</Link>
                </Menu.Item>
                <Menu.Item key="3" className="right">
                  <DropdownMenu username={user.name} />
                </Menu.Item>
              </Menu>
            ) : (
                <Menu
                  theme="dark"
                  mode="horizontal"
                  style={{ lineHeight: "60px" }}
                >
                  <Menu.Item key="1" className="left">
                    <Icon
                      className="trigger"
                      type={this.state.collapsed ? "menu-unfold" : "menu-fold"}
                      onClick={this.toggle}
                    />
                  </Menu.Item>
                  <Menu.Item key="2" className="left">
                    <Link to="/">Sahaayak</Link>
                  </Menu.Item>
                  <Menu.Item key="3" className="right">
                    <Button type="primary" onClick={this.openLoginModal}>
                      Login
                  </Button>
                    {openloginModal ? <LoginModal /> : null}
                    {openregisterModal ? <RegisterModal /> : null}
                  </Menu.Item>
                </Menu>
              )}
          </Header>
          <Layout>
            <SideBar collapseProp={this.state.collapsed} />
            <Route path="/admin" component={AdminNavbar} />
            <Content
              style={{
                marginTop: "50px",
                padding: 24,
                background: "#fff",
                minHeight: 280
              }}
            >
              <Route exact path="/" component={Slideshow} />
              <Route exact path="/" component={TopVendors} />
              <Switch>
                <Route exact path="/settings" component={Settings} />
                <Route exact path="/userDashboard" component={UserDashboard} />
                <Route exact path="/categoryWiseServices/:categoryName" component={CategoryWiseServices} />
                <Route exact path="/service/:serviceId" component={Service} />
                <Route exact path="/vendorDashboard" component={VendorDashboard} />
                <Route exact path="/vendorSalesPage" component={VendorSalesPage} />
                <Route exact path="/admin/categories" component={Categories} />
                <Route exact path="/admin/users" component={Users} />
              </Switch>
            </Content>
          </Layout>
        </Layout>
      </Router>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { openLoginModal }
)(Navbar);
