import React from 'react';
import ReactDOM from 'react-dom';

import { createHistory } from 'history';
import useScroll from 'scroll-behavior/lib/useStandardScroll';

import shouldUpdateScroll from './utility/shouldUpdateScroll';
import { useRouterHistory } from 'react-router';
import App from './App';

import './styling/global.css';

const basename = `/index`;

const history = useScroll(useRouterHistory(createHistory))({
	basename,
	shouldUpdateScroll,
});

const root = document.getElementById('root');

const render = () => {
	const WrappedApp = () =>
		<div>
			<App history={history} />
		</div>
	;

	ReactDOM.render(<WrappedApp />, root);
};
//
if (!global.Intl) {
		require.ensure([ 'intl' ], function (require) {
				require('intl');
				render();
		});
} else {
		render();
}
