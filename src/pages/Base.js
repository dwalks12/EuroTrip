import React, { Component, PropTypes } from 'react';
import { StyleSheet, css } from '../styling/index.js';
import { breakpoints, marginsAtWidth, webFonts } from '../styling/variables';
// import { country } from 'config';
import { Link, IndexLink } from 'react-router';
import Helmet from 'react-helmet';

import FontLoader from '../containers/FontLoader';
// import TopMenu from 'containers/TopMenuContainer';
// import OpenTopMenu from 'modules/OpenTopMenu';
// import FooterMenu from 'modules/FooterMenu';
// import FooterLinks from 'presentational/FooterLinks';

// import { ProvideAnalytics } from 'utility/analytics';

export default class Base extends Component {
	static propTypes = {
		children: PropTypes.any,
	}

	constructor(props) {
		super(props);

		this.state = {
			menuOpen: false,
		};

	}

	componentDidMount() {
		const html = document.getElementsByTagName('html')[0];
		html.className = (html.className + ' ' + css(styles.html)).trim();
	}

	componentWillUnmount() {
		const html = document.getElementsByTagName('html')[0];
		html.className = html.className.replace(css(styles.html), '').trim();

	}

	renderPage() {
		return <div>
			<div className={css(styles.top)}>
				<Link
					className={css(styles.menuItem)}
					to={'/'}>
						{'Home'}
				</Link>
				<Link
					className={css(styles.menuItem)}
					to={'/image'}>
					{'Upload'}
				</Link>
				<Link
					className={css(styles.menuItem)}
					to={'/gallery'}>
					{'Gallery'}
				</Link>
				<Link
					className={css(styles.menuItem)}
					to={'/404'}>
					{'About'}
				</Link>
				<Link
					className={css(styles.menuItem)}
					to={'/404'}>
					{'Log in'}
				</Link>
			</div>
				<div className={css(styles.content)}>
					{ this.props.children }
				</div>


		</div>;
	}

	render() {
		return (
			<div className={css(styles.base)}>
				<FontLoader fonts={webFonts} />
				<Helmet
					titleTemplate={'%s - EuroTrip 2016'}
					meta={[
						{ 'name': 'description', 'content': 'website description' },
					]}
				/>

				{ this.state.menuOpen
					?
							<div>{'menu open'}</div>
					: this.renderPage()
				}
				<div className={css(styles.footer)}>
						<div>{'footer menu'}</div>
				</div>
			</div>
		);
	}
}

const styles = StyleSheet.create({
	html: {
		fontSize: '5vw',

		[`@media (min-width: ${ breakpoints.smMin }px)`]: {
			fontSize: '16px',
		},

		[`@media (min-width: ${ breakpoints.lgMin }px)`]: {
			fontSize: '20px',
		},
	},

	base: {
		width: '100%',
		margin: '0 auto',
		position: 'relative',
	},
	footer: {
			width: '100%',
			height: '200px',
			background: 'black',
		},
	content: {
		padding: `0 ${marginsAtWidth(breakpoints.smMin)}px`,

		[`@media (min-width: ${ breakpoints.mdMin }px)`]: {
			padding: `0 ${marginsAtWidth(breakpoints.mdMin)}px`,
		},

		[`@media (min-width: ${ breakpoints.lgMin }px)`]: {
			padding: `0 ${marginsAtWidth(breakpoints.lgMin)}px`,
		},
	},
	menuItem: {
		fontWeight: 'bold',
		fontFamily: 'futura',
		color: 'black',
		fontSize: '30px',
		padding: '15px',
		cursor: 'pointer',
		':hover': {
			color: 'grey',
			textShadow: '0px 0px 2px white',
			textDecoration: 'underline',
		},
		width: '15%',
		textAlign: 'center',
	},
	top: {
		paddingTop: 10,
		paddingBottom: 10,
		width: '100%',
		margin: 'auto',
		float: 'none',
		textAlign: 'center',
		display: 'inline-block',
	},
});
