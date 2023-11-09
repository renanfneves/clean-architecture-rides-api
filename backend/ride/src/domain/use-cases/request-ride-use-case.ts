import { AccountNotFoundError } from "../errors/account-not-found-error"
import { NotCompletedPreviousRideError } from "../errors/not-completed-previous-ride"
import { IAccountsRepository } from "@/infra/repositories/accounts-repository"
import { IRidesRepository } from "@/infra/repositories/rides-repository"
import { Account, Ride } from "@prisma/client"

interface RequestRideParams {
  passengerId: string
  fromLatitude: number
  fromLongitude: number
  toLatitude: number
  toLongitude: number
}

export class RequestRideUseCase {
  constructor(
    private readonly accountsRepository: IAccountsRepository<Account>,
    private readonly ridesRepository: IRidesRepository<Ride>
  ) {}
  async execute({ passengerId, fromLatitude, fromLongitude, toLatitude, toLongitude }: RequestRideParams) {
    const account = await this.accountsRepository.getPassengerById(passengerId)
    if(!account) {
      throw new AccountNotFoundError()
    }
    const notCompletedPreviousRides = await this.ridesRepository.getIncompleteRidesByPassengerId(passengerId)
    if(notCompletedPreviousRides?.length){
      throw new NotCompletedPreviousRideError()
    }
    const ride = await this.ridesRepository.create({
      passengerId,
      fromLatitude,
      fromLongitude,
      toLatitude,
      toLongitude,
    })

    return {
      rideId: ride.ride_id
    }
  }
}