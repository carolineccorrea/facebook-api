import { AuthenticationError } from "../errors"
import { AccessToken } from "../models"

export interface FacebookAuth {
  execute: (token: string) => AccessToken | Error
}

export namespace FacebookAuthentication {
  export type Params = {
    token: string
  }

  //export type Result = AccessToken | AuthenticationError
  export type Result = undefined
}
