import { validationResult } from 'express-validator'
import { labelValidations as validations } from './validations.js'

class LabelRouter {
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
    this._router.get('/', this._checkToken('edit'), this.handleGetLabels.bind(this))
    this._router.get('/:id', this._checkToken('edit'), this.handleGetLabel.bind(this))
    this._router.post('/', [this._checkToken('edit'), this._validations], this.handlePostLabel.bind(this))
    this._router.delete('/:id', this._checkToken('edit'), this.handleDeleteLabel.bind(this))
    this._router.put('/:id', [this._checkToken('edit'), this._validations], this.handleUpdateLabel.bind(this))
  }

  async handleGetLabels (req, res) {
    try {
      const result = await this._controller.getAllLabels()
      if (result.length === 0) {
        this._response.success(req, res, 'No hay etiquetas aún', this._httpCode.NOT_FOUND)
      } else {
        this._response.success(req, res, result, this._httpCode.OK)
      }
    } catch (error) {
      this._response.error(req, res, error, this._httpCode.INTERNAL_SERVER_ERROR)
    }
  }

  async handleGetLabel (req, res) {
    try {
      const result = await this._controller.getLabel(req.params.id)
      if (result) {
        this._response.success(req, res, result, this._httpCode.OK)
      } else {
        this._response.success(req, res, 'Elemento no encontrado', this._httpCode.NOT_FOUND)
      }
    } catch (error) {
      this._response.error(req, res, error, this._httpCode.INTERNAL_SERVER_ERROR)
    }
  }

  async handlePostLabel (req, res) {
    const errors = this._validationResult(req)

    if (errors.isEmpty()) {
      const data = req.body
      const result = await this._controller.createNewLabel(data)
      this._response.success(req, res, result, this._httpCode.CREATED)
    } else {
      this._response.error(req, res, errors, this._httpCode.BAD_REQUEST)
    }
  }

  async handleDeleteLabel (req, res) {
    try {
      const result = await this._controller.deleteLabel(req.params.id)
      if (result) {
        this._response.success(req, res, 'Item deleted at labels table', this._httpCode.OK)
      } else {
        this._response.success(req, res, 'Elemento no encontrado', this._httpCode.NOT_FOUND)
      }
    } catch (error) {
      this._response.error(req, res, error, this._httpCode.INTERNAL_SERVER_ERROR)
    }
  }

  async handleUpdateLabel (req, res) {
    const errors = this._validationResult(req)

    if (errors.isEmpty()) {
      try {
        const data = req.body
        const result = await this._controller.updateLabel(data, req.params.id)

        if (result) {
          this._response.success(req, res, 'Item modified at labels table', this._httpCode.OK)
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

export default LabelRouter
