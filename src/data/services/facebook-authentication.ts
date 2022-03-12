import { LoadFacebookUserApi } from "@/domain/contracts/gateways"
import { AuthenticationError } from "@/domain/errors"
import { FacebookAuthentication } from "@/domain/features"

export class FacebookAuthenticationService {
  constructor(private readonly loadFacebookByTokenApi: LoadFacebookUserApi) { }
  async execute(params: FacebookAuthentication.Params): Promise<AuthenticationError> {
    await this.loadFacebookByTokenApi.loadUser(params)
    return new AuthenticationError()
  }
}
