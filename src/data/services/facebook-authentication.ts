import { LoadFacebookUserApi } from "@/domain/contracts/gateways"
import { AuthenticationError } from "@/domain/errors"
import { FacebookAuthentication } from "@/domain/features"
import { LoadUserAccountRepository } from "../repos/user-account"

export class FacebookAuthenticationService {
  constructor(
    private readonly loadFacebookByTokenApi: LoadFacebookUserApi,
    private readonly loadUserAccountRepo: LoadUserAccountRepository) { }
  async execute(params: FacebookAuthentication.Params): Promise<AuthenticationError> {
    const fbData = await this.loadFacebookByTokenApi.loadUser(params)
    if(fbData !== undefined)
    await this.loadUserAccountRepo.loadUser({email: fbData?.email})
    return new AuthenticationError()
  }
}
