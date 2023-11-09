import { PrismaClient, Ride } from "@prisma/client";
import { CreateRideDTO } from "@/domain/dtos/create-ride-dto";
import { IRidesRepository } from "../../rides-repository";

export class PrismaRidesRepository implements IRidesRepository<Ride> {
  constructor(private readonly database: PrismaClient) {}
  async getRideById(rideId: string) {
    return await this.database.ride.findUnique({
      where: {
        ride_id: rideId
      }
    })
  }
  async getIncompleteRidesByPassengerId(passengerId: string) {
    return await this.database.ride.findMany({
      where: {
        passenger_id: passengerId,
        status: {
          not: 'completed'
        }
      }
    })
  }
  async create(ride: CreateRideDTO): Promise<Ride> {
    return await this.database.ride.create({
      data: {
        passenger_id: ride.passengerId,
        from_lat: ride.fromLatitude,
        from_long: ride.fromLongitude,
        to_lat: ride.toLatitude,
        to_long: ride.toLongitude
      }
    })
  }

}