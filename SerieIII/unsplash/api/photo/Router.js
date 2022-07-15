import { validationResult } from 'express-validator'
import { photoValidations as validations } from './validations.js'

class PhotoRouter {
  constructor (router, controller, response, httpCode, checkAuthorization) {
    this._router = router()
    this._controller = controller
    this._response = response
    this._httpCode = httpCode
    this._validations = validations
    this._validationResult = validationResult
    this._checkToken = checkAuthorization
    this.registerRoutes()
  }

  registerRoutes () {
    this._router.get('/', this._checkToken('read'), this.handleGetPhotos.bind(this))
    this._router.get('/:id', this._checkToken('read'), this.handleGetPhoto.bind(this))
    this._router.post('/', [this._checkToken('edit'), this._validations], this.handlePostPhoto.bind(this))
    this._router.delete('/:id', this._checkToken('edit'), this.handleDeletePhoto.bind(this))
    this._router.put('/:id', this._checkToken('edit'), this.handleUpdatePhoto.bind(this))
  }

  async handleGetPhotos (req, res) {
    try {
      const result = await this._controller.getAllPhotos()
      if (result.length === 0) {
        this._response.success(req, res, 'No hay canciones', this._httpCode.NOT_FOUND)
      } else {
        this._response.success(req, res, result, this._httpCode.OK)
      }
    } catch (error) {
      this._response.error(req, res, error, this._httpCode.INTERNAL_SERVER_ERROR)
    }
  }

  async handleGetPhoto (req, res) {
    try {
      const result = await this._controller.getPhoto(req.params.id)
      if (result) {
        this._response.success(req, res, result, this._httpCode.OK)
      } else {
        this._response.success(req, res, 'Elemento no encontrado', this._httpCode.NOT_FOUND)
      }
    } catch (error) {
      this._response.error(req, res, error, this._httpCode.INTERNAL_SERVER_ERROR)
    }
  }

  async handlePostPhoto (req, res) {
    const errors = this._validationResult(req)

    if (errors.isEmpty()) {
      const data = req.body
      const result = await this._controller.createNewPhoto(data)
      this._response.success(req, res, result, this._httpCode.CREATED)
    } else {
      this._response.error(req, res, errors, this._httpCode.BAD_REQUEST)
    }
  }

  async handleDeletePhoto (req, res) {
    try {
      const result = await this._controller.deletePhoto(req.params.id)
      if (result) {
        this._response.success(req, res, 'Item deleted at photos table', this._httpCode.OK)
      } else {
        this._response.success(req, res, 'Elemento no encontrado', this._httpCode.NOT_FOUND)
      }
    } catch (error) {
      this._response.error(req, res, error, this._httpCode.INTERNAL_SERVER_ERROR)
    }
  }

  async handleUpdatePhoto (req, res) {
    const errors = this._validationResult(req)

    if (errors.isEmpty()) {
      try {
        const data = req.body
        const result = await this._controller.updatePhoto(data, req.params.id)
        if (result) {
          this._response.success(req, res, 'Item modified at photos table', this._httpCode.OK)
        } else {
          this._response.success(req, res, 'Elemento no encontrado', this._httpCode.NOT_FOUND)
        }
      } catch (error) {
        this._response.error(req, res, error, this._httpCode.INTERNAL_SERVER_ERROR)
      }
    } else {
      this._response.error(req, res, errors, this._httpCode.BAD_REQUEST)
    }
  }
}

export default PhotoRouter
