import React, { Component } from 'react';
import './social.less';
import SocialItemComponent from './social-item/social-item.js';
import SocialItem from './social-item/social-item.model.js';


class Social extends Component {

  social = [
    new SocialItem("linkedin", "https://www.linkedin.com/profile/view?id=52957269"),
    new SocialItem("github", "https://github.com/shadowbeam/"),
    new SocialItem("facebook", "https://www.facebook.com/watson.allan"),
    new SocialItem("twitter", "https://twitter.com/shadowbeam_"),
    new SocialItem("nike", "https://secure-nikeplus.nike.com/plus/profile/shadowbeam/"),
    new SocialItem("google-plus", "https://plus.google.com/u/0/110066024819374028528"),
    new SocialItem("lastfm", "http://www.last.fm/user/shadowbeam"),
    new SocialItem("spotify", "https://play.spotify.com/user/shadowbeam"),
    new SocialItem("songkick", "https://www.songkick.com/users/shadowbeam"),
    new SocialItem("instagram", "http://www.instagram.com/shadowbeam"),

   ];


  render() {
    return (
        <div className='social-items'>
  	      {this.social.map((socialItem) =>
            <SocialItemComponent value={socialItem} />)}
        </div>
      )}
}

export default Social;
