import React from 'react'

class User {
  constructor(id, name, email) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.favorites = [];
  }

  addFavroite(favorite) {
    this.favorites.push(favorite);
  }
}

export default User
