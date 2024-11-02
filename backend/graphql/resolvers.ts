// graphql/resolvers.ts

import { PrismaClient } from '@prisma/client';
import { GraphQLResolveInfo } from 'graphql';

const prisma = new PrismaClient();

type UserArgs = {
  id: number;
};

type CreateUserArgs = {
  name: string;
  email: string;
};

export const resolvers = {
  Query: {
    users: async (_parent: unknown, _args: unknown, _context: unknown, _info: GraphQLResolveInfo) => {
      // 2秒の遅延を追加
      await new Promise((resolve) => setTimeout(resolve, 2000));
      return await prisma.user.findMany();
    },
    user: async (_parent: unknown, args: UserArgs) => {
      return await prisma.user.findUnique({
        where: { id: args.id },
      });
    },
  },
  Mutation: {
    createUser: async (_parent: unknown, args: CreateUserArgs) => {
      return await prisma.user.create({
        data: {
          name: args.name,
          email: args.email,
        },
      });
    },
  },
};
