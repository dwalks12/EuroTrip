import React, { Component } from 'react';
import { StyleSheet, css } from '../styling/index.js';
import Helmet from 'react-helmet';
import {merge,swing,rollOut,rotateIn, rotateOut, pulse,shake, flash, bounce, rubberBand, jello} from 'react-animations';
import $ from 'jquery';
const animation = merge(rotateOut, rotateIn);
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
    $.ajax({
      type: 'GET',
      url: postURL + '/images',
      success: this.handlePostSuccess.bind(this),
      error: this.handlePostError.bind(this),
      dataType: 'json',
    });
  }
  handlePostSuccess(data) {
    if(data.length > 0) {
      var urls = [];
      for(var item in data) {
        urls.push(data[item]);
      }

      this.setState({
        imageUrls: urls,
      });
    }
  }

  handlePostError(err) {
    console.log(err);
  }
  handleDeleteSuccess( theIndex, data) {

    var tempArray = this.state.imageUrls.filter(function(el, index) {
      return index !== theIndex;
    });
    this.setState({
      imageUrls: tempArray,
    })
  }
  handleDeleteError(err) {
    console.log(err);
  }
  deleteImage(imageId, index) {
    $.ajax({
      type: 'DELETE',
      url: postURL+ '/images/' + imageId,
      success: this.handleDeleteSuccess.bind(this, index),
      error: this.handleDeleteError.bind(this),
      dataType: 'json',
    });
  }
  renderImages(images) {
    console.log(images);
    if(images.length > 0) {
      return images.map((images, index) => (
        <div key={`${index}-div1`}><div key={`${index}-div3`} className={css(styles.closeIcon)} onClick={() => this.deleteImage(images._id, index)}></div><img className={css(styles.galleryImages)} src={images.imageUrl} key={index} ></img></div>
      ))
    } else {
      return [];
    }
  }
	render() {
    const images = this.renderImages(this.state.imageUrls);

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
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    flexWrap: 'wrap',
    justifyContent: 'center',
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
  closeIcon: {
    position: 'absolute',
    display:'block',
    boxSizing:'border-box',
    width:'20px',
    height:'20px',
    borderWidth:'3px',
    borderStyle: 'solid',
    borderColor:'black',
    borderRadius:'100%',
    background: '-webkit-linear-gradient(-45deg, transparent 0%, transparent 46%, white 46%,  white 56%,transparent 56%, transparent 100%), -webkit-linear-gradient(45deg, transparent 0%, transparent 46%, white 46%,  white 56%,transparent 56%, transparent 100%)',
    backgroundColor:'black',
    boxShadow:'0px 0px 5px 2px rgba(0,0,0,0.5)',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    ':hover': {
      animationName: animation,
      animationDuration: '1s',
      animationIterationCount: 'infinite',
    },

  },
	paddingTop: {
		paddingTop: 0,
	},
});
