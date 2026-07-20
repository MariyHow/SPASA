import React from 'react'

class Favorite {
  constructor(id, user, nasaImage) {
    this.id = id;
    this.user = user;
    this.nasaImage = nasaImage;
    this.createdDate = new Date();
  }
}

export default Favorite
