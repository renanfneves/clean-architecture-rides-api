import { Account, PrismaClient } from "@prisma/client";
import { IAccountsRepository } from "../../accounts-repository";

export class InMemoryAccountsRepository implements IAccountsRepository<Account> {
  passengers: Account[] = []
  async getPassengerById(passengerId: string) {
    const passenger = await this.passengers.find(passenger => passenger.account_id === passengerId && passenger.is_passenger)
    if(!passenger) {
      return null
    }
    return passenger
  }
}