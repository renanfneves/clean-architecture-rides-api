import { Prisma, Ride } from "@prisma/client";
import { CreateRideDTO } from "@/domain/dtos/create-ride-dto";
import { IRidesRepository } from "../../rides-repository";
import { randomUUID } from 'node:crypto'


export class InMemoryRidesRepository implements IRidesRepository<Ride> {
  rides: Ride[] = []
  async getRideById(rideId: string) {
    const ride =  await this.rides.find(ride => ride.ride_id === rideId)
    if(!ride){
      return null
    }
    return ride
  }
  async getIncompleteRidesByPassengerId(passengerId: string) {
    return await this.rides.filter(ride => ride.passenger_id === passengerId && ride.status !== 'completed')
  }
  async create(data: CreateRideDTO): Promise<Ride> {
    const ride: Ride = {
      ride_id: randomUUID(),
      passenger_id: data.passengerId,
      status: 'requested',
      from_lat: new Prisma.Decimal(data.fromLatitude.toString()),
      from_long: new Prisma.Decimal(data.fromLongitude.toString()),
      to_lat: new Prisma.Decimal(data.toLatitude.toString()),
      to_long: new Prisma.Decimal(data.toLongitude.toString()),
      date: new Date(),
      driver_id: null,
      fare: null,
      distance: null
  }
     await this.rides.push(ride)

     return ride
  }

}