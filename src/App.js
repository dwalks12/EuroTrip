import 'babel-polyfill';

import React, { Component, PropTypes } from 'react';
// import cookies from 'cookies-js';
import _ from 'lodash';

import routes from './data/routes.js';
//import Analytics from 'utility/analytics';

import Router from 'react-router/lib/Router';
import Route from 'react-router/lib/Route';
import IndexRoute from 'react-router/lib/IndexRoute';
import Redirect from 'react-router/lib/Redirect';

export default class App extends Component {
	static propTypes = {
		history: PropTypes.object.isRequired,
		location: PropTypes.object,
	}

  static childContextTypes = {
    analytics: PropTypes.object,
  }

	constructor(props) {
		super(props);

		window._data = window._data || {};
	}

	getChildContext() {
    return {
			analytics: this.analytics,
		};
  }

	render() {
		return (
			<Router history={this.props.history}>
				{/* Trailing slashes are ☹️ */}
				<Redirect from='**/' to=':splat' />

				<Route path='/' getComponent={page('Base')}>
					{ PageRoutes }
					<IndexRoute getComponent={page('Front')} />

					<Route path='404' getComponent={page('404')} />
					<Redirect from='**' to='404' />
				</Route>

			</Router>
		);
	}
}

const page = (page) => (location, cb) => {
	require.ensure([], (require) => {
		cb(null, require('./pages/' + page).default);
	});
};

const PageRoutes = Object.keys(routes.pages).map(pageId => {
	const componentName = _.upperFirst(pageId);
	const path = routes.pages[pageId];

	return <Route key={pageId} path={path} getComponent={page(componentName)} />;
});
