import { Account, PrismaClient } from "@prisma/client";
import { IAccountsRepository } from "../../accounts-repository";

export class PrismaAccountsRepository implements IAccountsRepository<Account> {
  constructor(private readonly database: PrismaClient) {}
  async getPassengerById(passengerId: string) {
    return await this.database.account.findUnique({
      where: {
        account_id: passengerId,
        is_passenger: true
      }
    })
  }
}