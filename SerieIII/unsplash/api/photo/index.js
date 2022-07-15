import PhotoRouter from './Router.js'
import PhotoController from './controller.js'
import { response } from '../../response/response.js'
import { HttpCode } from '../../response/httpcode.js'
import { DbMongo } from '../../store/DbMongo.js'
import Photo from '../../entities/Photo.js'
import { checkAuthorization } from '../../middleware/secure.js'

export const photoModule = (expressRouter) => {
  const service = new DbMongo()
  const photoController = new PhotoController(service, Photo)
  const photoRouter = new PhotoRouter(expressRouter, photoController, response, HttpCode, checkAuthorization)
  return photoRouter._router
}
