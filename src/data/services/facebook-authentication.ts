import { LoadFacebookUserApi } from "@/domain/contracts/gateways"
import { AuthenticationError } from "@/domain/errors"
import { FacebookAuthentication } from "@/domain/features"
import { CreateFacebookAccountRepository, LoadUserAccountRepository } from "../repos/user-account"

export class FacebookAuthenticationService {

  constructor(
    private readonly loadFacebookByTokenApi: LoadFacebookUserApi,
    private readonly loadUserAccountRepo: LoadUserAccountRepository,
    private readonly createFacebookAccountRepo: CreateFacebookAccountRepository
  ) { }

  async execute(params: FacebookAuthentication.Params): Promise<AuthenticationError> {
    const fbData = await this.loadFacebookByTokenApi.loadUser(params)
    if (fbData !== undefined) {
      await this.loadUserAccountRepo.loadUser({ email: fbData?.email })
      await this.createFacebookAccountRepo.createFromFacebook(fbData)
    }
    return new AuthenticationError()
  }
}
