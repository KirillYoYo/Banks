import React from 'react';
import PropTypes from 'prop-types'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Layout, Affix, Row, Col} from 'antd';
import {Route, Redirect} from 'react-router-dom';
import AddTransaction from '../AddTransaction';
import Table from '../Table';


import {childRoutes} from '@/route'
import authHOC from '@/utils/auth'

import NavPath from '@/components/NavPath'
import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'
import Footer from '@/components/Footer'
import {fetchProfile, logout} from '@/actions/auth';

import './index.sass';

const {Content} = Layout;

class App extends React.Component {
	constructor(props) {
		super(props);
	}

	componentWillMount() {
		const {actions} = this.props;
		actions.fetchProfile();
	}

	render() {
		const {auth, navpath, actions} = this.props;

		return (
			<Layout className="ant-layout-has-sider">
				<Sidebar />
				<Layout>
					<Header profile={auth} logout={actions.logout}/>
					<Content style={{margin: '0 16px'}}>
						<div style={{minHeight: 360}}>
							<Route path="/main" render={() => (
								<h3>main</h3>
							)}/>
							<Route path="/main/table" component={Table}/>
							<Route path="/main/addTransaction" component={AddTransaction}/>
						</div>
					</Content>
				</Layout>
			</Layout>
		);
	}
}

App.propTypes = {
	auth: PropTypes.object,
	navpath: PropTypes.array
};

const mapStateToProps = (state) => {
	const {auth, menu} = state;
	return {
		auth: auth ? auth : null,
		navpath: menu.navpath
	};
};

function mapDispatchToProps(dispatch) {
	return {actions: bindActionCreators({fetchProfile, logout}, dispatch)};
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
