import React from 'react'

class SearchResults {
  constructor(query) {
    this.query = query;
    this.images = [];
    this.resultCount = 0;
  }

  addImage(nasaImage) {
    this.images.push(nasaImage);
    this.resultCount = this.images.length;
  }
}

export default SearchResults
