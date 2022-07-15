class PhotoController {
  constructor (servicesPhoto, photoEntity) {
    this._service = servicesPhoto
    this._entity = photoEntity
  }

  async getAllPhotos () {
    const response = await this._service.all('photo')
    return response
  }

  async getPhoto (id) {
    const response = await this._service.getItem('photo', id)
    return response
  }

  async createNewPhoto (photo) {
    const newPhoto = new this._entity(photo)
    const response = await this._service.save('photo', newPhoto)
    return response
  }

  async deletePhoto (id) {
    const response = await this._service.delete('photo', id)
    return response
  }

  async updatePhoto (photo, id) {
    const newPhoto = new this._entity(photo)
    const response = await this._service.update('photo', newPhoto, id)
    return response
  }
}

export default PhotoController
