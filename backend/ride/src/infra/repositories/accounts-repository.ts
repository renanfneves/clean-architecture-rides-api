export interface IAccountsRepository<Model> {
  getPassengerById(passengerId: string): Promise<Model | null>
}