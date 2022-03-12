import { LoadFacebookUserApi } from "@/domain/contracts/gateways";
import { AuthenticationError } from "@/domain/errors";
import { FacebookAuthenticationService } from "@/data/services";

import { mock } from 'jest-mock-extended';

class LoadFacebookUserApiSpy implements LoadFacebookUserApi {
  token?: string
  result = undefined

  async loadUser (params: LoadFacebookUserApi.Params): Promise<LoadFacebookUserApi.Result> {
    this.token = params.token
    return this.result
  }
}


describe('FacebookAuthenticationService', () => {
  it('should ', async () => {
    const loadFacebookUserApi = mock<LoadFacebookUserApi>()
    const sut = new FacebookAuthenticationService(loadFacebookUserApi)

    await sut.execute({ token: 'any_token' })
    expect(loadFacebookUserApi.loadUser).toHaveBeenCalledWith({ token: 'any_token' })
    expect(loadFacebookUserApi.loadUser).toHaveBeenCalledTimes(1)
  });

  it('Deve retornar um AuthenticationError quando LoadFacebookUserApi retornar undefined ', async () => {
    const loadFacebookUserApi =  mock<LoadFacebookUserApi>()
    loadFacebookUserApi.loadUser.mockResolvedValueOnce(undefined)
    const sut = new FacebookAuthenticationService(loadFacebookUserApi)

    const result = await sut.execute({ token: 'any_token'})
    expect(result).toEqual(new AuthenticationError())
  });

});
