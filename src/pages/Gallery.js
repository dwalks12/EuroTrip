import React, { Component } from 'react';
import { StyleSheet, css } from '../styling/index.js';
import Helmet from 'react-helmet';
import $ from 'jquery';
const postURL = 'https://eurotrip2016.herokuapp.com'; // for local testing.'http://localhost:3000';//
export default class GalleryPage extends Component {
	static propTypes = {}
  constructor(props) {
    super(props);
    this.state = {
      imageUrls: [],
    };

  }
  componentDidMount() {
    this.getImages();
  }

  getImages() {
    console.log('getting images');
    $.ajax({
      type: 'GET',
      url: postURL + '/images',
      success: this.handlePostSuccess.bind(this),
      error: this.handlePostError.bind(this),
      dataType: 'json',
    });
  }
  handlePostSuccess(data) {
    console.log(data);
    if(data.length > 0) {
      var urls = [];
      for(var item in data) {
        urls.push(data[item].imageUrl);
      }

      this.setState({
        imageUrls: urls,
      });
    }
  }

  handlePostError(err) {
    console.log(err);
  }
  renderImages(images) {
    console.log(images);
    if(images.length > 0) {
      return images.map((images, index) => (
        <img className={css(styles.galleryImages)} src={images} key={index} />
      ))
    } else {
      return [];
    }
  }
	render() {
    const images = this.renderImages(this.state.imageUrls);
    console.log(images);
		return (
			<div>
				<Helmet title='EuroTrip 2016' />

				<div className={css(styles.centerItems)}>
          {images}
        </div>
				<div className={css(styles.paddingTop)}>
				</div>
			</div>
		);
	}
}

const styles = StyleSheet.create({
  centerItems: {
    margin: 'auto',
    textAlign: 'center',
  },
  galleryImages: {
    objectFit: 'cover',
    overflow: 'hidden',
    width: '300px',
    height: '300px',
    margin: '10 10 10 10',
    borderStyle: 'solid',
    borderColor: 'black',
    borderWidth: '5px',
  },
	paddingTop: {
		paddingTop: 0,
	},
});
