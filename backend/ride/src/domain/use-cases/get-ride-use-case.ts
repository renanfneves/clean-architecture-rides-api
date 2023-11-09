import { IRidesRepository } from "@/infra/repositories/rides-repository";
import { Ride } from "@prisma/client";

interface GetRideUseParams {
  rideId: string
}

export class GetRideUseCase {
  constructor(private readonly ridesRepository: IRidesRepository<Ride>) {}
  async execute({ rideId }: GetRideUseParams) {
    const ride = await this.ridesRepository.getRideById(rideId)

    return {
      ride
    }
  }
}