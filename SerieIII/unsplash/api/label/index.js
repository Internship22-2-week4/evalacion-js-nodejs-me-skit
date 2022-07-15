import LabelRouter from './Router.js'
import LabelController from './controller.js'
import { response } from '../../response/response.js'
import { HttpCode } from '../../response/httpcode.js'
import { DbMongo } from '../../store/DbMongo.js'
import Label from '../../entities/Label.js'
import { checkAuthorization } from '../../middleware/secure.js'

export const labelModule = (expressRouter) => {
  const service = new DbMongo()
  const labelController = new LabelController(service, Label)
  const labelRouter = new LabelRouter(expressRouter, labelController, response, HttpCode, checkAuthorization)
  return labelRouter._router
}
