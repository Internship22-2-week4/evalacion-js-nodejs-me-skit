class LabelController {
  constructor (servicesLabel, labelEntity) {
    this._service = servicesLabel
    this._entity = labelEntity
  }

  async getAllLabels () {
    const response = await this._service.all('label')
    return response
  }

  async getLabel (id) {
    const response = await this._service.getItem('label', id)
    return response
  }

  async createNewLabel (label) {
    const newLabel = new this._entity(label)
    const response = await this._service.save('label', newLabel)
    return response
  }

  async deleteLabel (id) {
    const response = await this._service.delete('label', id)
    return response
  }

  async updateLabel (label, id) {
    const newLabel = new this._entity(label)
    const response = await this._service.update('label', newLabel, id)
    return response
  }
}

export default LabelController
