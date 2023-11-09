import { PrismaClient } from '@prisma/client'
import { PrismaAccountsRepository } from './prisma-accounts-repository'
import { PrismaRidesRepository } from './prisma-rides-repository'

const prisma = new PrismaClient()
const prismaAccountRepository = new PrismaAccountsRepository(prisma)
const prismaRidesRepository = new PrismaRidesRepository(prisma)

export { prismaAccountRepository, prismaRidesRepository }
