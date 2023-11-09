import { CreateRideDTO } from "@/domain/dtos/create-ride-dto"

export interface IRidesRepository<Model> {
  getRideById(rideId: string): Promise<Model | null>
  getIncompleteRidesByPassengerId(passengerId: string): Promise<Model[] | null>
  create(ride: CreateRideDTO): Promise<Model>
}