import { GetRideUseCase } from "@/domain/use-cases/get-ride-use-case"
import { InMemoryRidesRepository } from "@/infra/repositories/adapters/in-memory/in-memory-rides-repository"

let ridesRepository: InMemoryRidesRepository
let sut: GetRideUseCase

describe('Get Ride Use Case', () => {
  beforeEach(async () => {
    ridesRepository = new InMemoryRidesRepository()
    sut = new GetRideUseCase(ridesRepository)
  })
  it('should be possible to get ride', async () => {
    const createdRide = await ridesRepository.create({
      passengerId: 'fake_id',
      fromLatitude: -27.2092052,
      fromLongitude: -49.6401091,
      toLatitude: -27.0610928,
      toLongitude: -49.5229501
    })
    const { ride } = await sut.execute({
      rideId: createdRide.ride_id
    })
    expect(ride?.from_lat).toBe(createdRide.from_lat)
  })
})