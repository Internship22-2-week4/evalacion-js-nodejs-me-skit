class Photo {
  constructor (photo) {
    this._id = null
    this._title = photo.title
    this._description = photo._description
    this._date = photo.date
    this._uri = photo.uri
    this._userId = photo.userId
  }
}

export default Photo
