import React, { Component } from 'react';
import { StyleSheet, css } from '../styling/index.js';
import Helmet from 'react-helmet';
import image from '../images/cover_image.jpg';

export default class FrontPage extends Component {
	static propTypes = {}


	render() {
		

		return (
			<div>
				<Helmet title='EuroTrip 2016' />

				<div className={css(styles.dealerMetaContainer)}>
					<img className={css(styles.bannerImage)} src={image}/>
				</div>
				<div className={css(styles.carouselContainer)}>
					<div className={css(styles.gridCarText)}>
					</div>

				</div>

				<div className={css(styles.paddingTop)}>
				</div>
			</div>
		);
	}
}

const styles = StyleSheet.create({
	dealerMetaContainer: {
		marginTop: '0.5rem',
		marginBottom: '0',
	},
	bannerImage: {
		maxHeight: '600px',
		width: '100%',
	},
	carouselContainer: {
		position: 'relative',
	},
	paddingTop: {
		paddingTop: 0,
	},
	gridCarText: {
		fontWeight: 'normal',
		textAlign: 'center',
		width: '70%',
		paddingBottom: '1.5625em',
		margin: 'auto',
	},
	padding: {
		paddingTop: '0.725em',
	},

});
