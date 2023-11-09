export class CreateRideDTO {
  constructor(
    readonly passengerId: string, 
    readonly fromLatitude: number,
    readonly fromLongitude: number,
    readonly toLatitude: number,
    readonly toLongitude: number,
    ) {}
}