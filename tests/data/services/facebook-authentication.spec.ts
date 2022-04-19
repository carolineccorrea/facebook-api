import { LoadFacebookUserApi } from "@/domain/contracts/gateways";
import { AuthenticationError } from "@/domain/errors";
import { FacebookAuthenticationService } from "@/data/services";
import { mock,MockProxy } from 'jest-mock-extended';
import { LoadUserAccountRepository } from "../repos/user-account";


describe('FacebookAuthenticationService', () => {
  let loadFacebookUserApi: MockProxy<LoadFacebookUserApi>
  let loadUserRepo: MockProxy<LoadUserAccountRepository>
  let sut: FacebookAuthenticationService

  beforeEach(() => {
    loadFacebookUserApi = mock()
    loadUserRepo = mock()
    sut = new FacebookAuthenticationService(
      loadFacebookUserApi,
      loadUserRepo
      )
    loadFacebookUserApi.loadUser.mockResolvedValueOnce({
      name: 'any_fb_name',
      email: 'any_fb_email',
      facebookId: 'any_fb_id'
    });
  })

  it('should ', async () => {
    await sut.execute({ token: 'any_token' })
    expect(loadFacebookUserApi.loadUser).toHaveBeenCalledWith({ token: 'any_token' })
    expect(loadFacebookUserApi.loadUser).toHaveBeenCalledTimes(1)
  });

  it('Deve retornar um AuthenticationError quando LoadFacebookUserApi retornar undefined', async () => {
    loadFacebookUserApi.loadUser.mockResolvedValueOnce(undefined)
    const result = await sut.execute({ token: 'any_token'})
    expect(result).toEqual(new AuthenticationError())
  });

  it('Deve retornar LoadUserByEmailRepo quando LoadFacebookUserApi retornar dados', async () => {
    await sut.execute({ token: 'any_token' })
    expect(loadUserRepo.loadUser).toHaveBeenCalledWith({email: 'any_fb_email'})
    expect(loadUserRepo.loadUser).toHaveBeenCalledTimes(1)
  });
});
