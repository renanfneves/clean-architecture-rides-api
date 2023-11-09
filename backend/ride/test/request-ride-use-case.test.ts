import { AccountNotFoundError } from "@/domain/errors/account-not-found-error"
import { NotCompletedPreviousRideError } from "@/domain/errors/not-completed-previous-ride"
import { RequestRideUseCase } from "@/domain/use-cases/request-ride-use-case"
import { InMemoryAccountsRepository } from "@/infra/repositories/adapters/in-memory/in-memory-accounts-repository"
import { InMemoryRidesRepository } from "@/infra/repositories/adapters/in-memory/in-memory-rides-repository"

let ridesRepository: InMemoryRidesRepository
let accountsRepository: InMemoryAccountsRepository
let sut: RequestRideUseCase

describe('Request Ride Use Case', () => {
  beforeEach(async () => {
    accountsRepository = new InMemoryAccountsRepository()
    ridesRepository = new InMemoryRidesRepository()
    sut = new RequestRideUseCase(accountsRepository, ridesRepository)

    accountsRepository.passengers.push({
      account_id: 'fake_id',
      name: 'John Doe',
      email: 'john@doe.com',
      cpf: '12345678909',
      car_plate: null,
      is_driver: false,
      is_passenger: true,
      password: '123456',
      password_algorithm: '123456',
      salt: 'xxx'
    })
  })
  it('should be possible to request a ride', async () => {
    const { rideId } = await sut.execute({
      passengerId: 'fake_id',
      fromLatitude: -27.2092052,
      fromLongitude: -49.6401091,
      toLatitude: -27.0610928,
      toLongitude: -49.5229501
    })
    const [createdRide] = ridesRepository.rides
    expect(rideId).toEqual(expect.any(String))
    expect(createdRide.status).toEqual('requested')
  })
  it('should not be possible to request a ride with a incomplete ride ongoing', async () => {
    await sut.execute({
      passengerId: 'fake_id',
      fromLatitude: -27.2092052,
      fromLongitude: -49.6401091,
      toLatitude: -27.0610928,
      toLongitude: -49.5229501
    })
    await expect(() => sut.execute({
      passengerId: 'fake_id',
      fromLatitude: -27.2092052,
      fromLongitude: -49.6401091,
      toLatitude: -27.0610928,
      toLongitude: -49.5229501
    })).rejects.toBeInstanceOf(NotCompletedPreviousRideError)
  })
  it('should not be possible to request a ride with a driver account', async () => {
    accountsRepository.passengers.push({
      account_id: 'driver_id',
      name: 'John Doe - Driver',
      email: 'john@doe2.com',
      cpf: '12345678909',
      car_plate: null,
      is_driver: true,
      is_passenger: false,
      password: '123456',
      password_algorithm: '123456',
      salt: 'xxx'
    })
    await expect(() => sut.execute({
      passengerId: 'driver_id',
      fromLatitude: -27.2092052,
      fromLongitude: -49.6401091,
      toLatitude: -27.0610928,
      toLongitude: -49.5229501
    })).rejects.toBeInstanceOf(AccountNotFoundError)
  })
})