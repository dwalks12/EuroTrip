import React, { Component } from 'react';
import { StyleSheet, css } from '../styling/index.js';
import Helmet from 'react-helmet';
import Dropzone from 'react-dropzone';
import request from 'superagent';
import {merge,swing,rollOut, rotateOut, pulse,shake, flash, bounce, rubberBand, jello} from 'react-animations';
import $ from 'jquery';
const animation = merge(flash, shake);
const CLOUDINARY_UPLOAD_PRESET = 'upload';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/ddaohvlb0/upload';
const postURL = 'https://eurotrip2016.herokuapp.com'; //'http://localhost:3000'; for local testing.
export default class ImagePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      uploadedFileCloudinaryUrl: '',
      success: false,
      loading: false,
    };
  }
  onImageDrop(files) {
    this.setState({
      uploadedFile: files[0],
      success: false,
      loading: true,
    });
    this.handleImageUpload(files[0]);
  }
  handleImageUpload(file) {
    let upload = request.post(CLOUDINARY_UPLOAD_URL)
                        .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
                        .field('file', file);

    upload.end((err, response) => {
      if (err) {
        console.error(err);
      }

      if (response.body.secure_url !== '') {
        //post the url to database.
        var postData = {
          imageUrl: response.body.secure_url,
          imageid: this.state.uploadedFile.name,
          createdBy: 'Unknown',//change this eventually
        }
        $.ajax({
          type: 'POST',
          url: postURL + '/images',
          data: postData,
          success: this.handlePostSuccess(this),
          error: this.handlePostError,
          dataType: 'json',
        });

        this.setState({
          uploadedFileCloudinaryUrl: response.body.secure_url,

        });
      }
    });
  }

  handlePostSuccess(data) {
    console.log(data);
    if(data) {
      this.setState({
        success: true,
        loading: false,
      });
    }
  }

  handlePostFailure(error) {
    console.log(error);
  }

	render() {
    console.log(this.state.loading);
    const loadingSpinner = <div style={{display: this.state.loading ? 'inline-block' : 'none'}} className={css(styles.gradientWrapper)}>{'Uploading Image'}</div>
		return (
			<div>
				<Helmet title='EuroTrip 2016 Upload Images' />

				<div className={css(styles.dealerMetaContainer)}>
					<h1>{'Import Your image here'}</h1>
				</div>
        <div className={css(styles.imageDropArea)}>
				<Dropzone
          className={css(styles.increasedWidth)}
          multiple={false}
          accept="image/*"
          onDrop={this.onImageDrop.bind(this)}>
          <p className={css(styles.centerAlign)}>{'Drop your image here or click here to select a file to upload.'}</p>
        </Dropzone>
        </div>
        {loadingSpinner}
        <div>
          <p className={css(styles.centered)} style={{display: this.state.success ? 'block' : 'none' }}> {'Image successfully uploaded'}</p>
        </div>
        <div className={css(styles.centered)}>
          <img className={css(styles.postedImage)} src={this.state.uploadedFileCloudinaryUrl} />
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
		marginLeft: 'auto',
		marginRight: 'auto',
		textAlign: 'center',
	},
  spinner: {
    borderRadius: '40px',
    background: 'white',
    width: '80px',
    height: '80px',
  },
  gradientWrapper: {
    animationName: animation,
    animationDuration: '5s',
    animationIterationCount: 'infinite',
    textAlign: 'center',
    margin: 'auto',
    width: '100%',
  },
  increasedWidth: {
    width: '100%',
    height: '200px',
    borderStyle: 'dashed',
    borderWidth: '5px',
  },
  centered: {
    margin: 'auto',
    marginTop: '70px',
    marginBottom: '70px',
    textAlign: 'center',
  },
  centerAlign: {
    margin: 'auto',
    marginTop: '70px',
    width: '80%',
  },
  postedImage: {
    width: '500px',
    height: 'auto',
    margin: 'auto',
    textAlign: 'center',
  },
  imageDropArea: {
    width: '450px',
    height: '200px',
    margin: 'auto',
    textAlign: 'center',
    marginBottom: '20px',
    marginTop: '20px',
    cursor: 'pointer',
  },
	bannerImage: {
		height: 'auto',
		width: 'auto',
		maxHeight: '600px',
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
