import React, { Component } from 'react';
import { StyleSheet, css } from 'styling';
//import { colors } from 'styling/variables';
//import * as colorutil from 'utility/color';
import Helmet from 'react-helmet';

// import models from 'data/models';
// import { ModelpageLink, PageLink } from 'containers/Link';
//import { pages } from 'data/routes';
// import ProvideDealerMeta from 'containers/ProvideDealerMeta';
// import { ProvideTextScope } from 'containers/Text';

// import DealerInfo from 'modules/DealerInfo';
// import Async from 'containers/Async';
// import Carousel from 'presentational/Carousel';
// import CTA from 'presentational/CTA';
// import Banner from 'presentational/BannerWithTextsAndCta';
// import GridWithCarsAndBox from 'containers/GridWithCarsAndBoxContainer';
// import { Heading, Body } from 'presentational/text';
export default class FrontPage extends Component {
	static propTypes = {}


	render() {
		return (
			<div>
				<Helmet title='EuroTrip 2016' />

				<div className={css(styles.dealerMetaContainer)}>
					<img className={css(styles.bannerImage)} src='/assets/images/cover_image.JPG'/>
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
