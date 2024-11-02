# Backend with Next.js, GraphQL, Apollo, and Prisma

このバックエンドプロジェクトは、Next.js をベースに構築され、Apollo Server を使用して GraphQL エンドポイントを提供します。Prisma をデータベースクライアントとして使用し、データベース操作を行います。

フロントエンドからは、Apollo Client を通じて GraphQL クエリおよびミューテーションを実行し、ユーザーデータを管理します。

## 技術スタック

- **Next.js**: サーバーサイドレンダリング (SSR) をサポートする React フレームワーク。API Routes を使用してバックエンド機能を提供。
- **GraphQL**: データ取得と操作を行うためのクエリ言語。Apollo Server と Apollo Client を使用して実装。
- **Apollo Server**: GraphQL のリクエストを処理し、データベースから情報を取得するためのサーバー。
- **Prisma**: データベースクライアントとして機能し、PostgreSQL に対する操作を簡単に行うための ORM。
- **PostgreSQL**: データの永続化に使用するリレーショナルデータベース。

## セットアップ手順

1. リポジトリをクローンします。

2. Docker Compose でバックエンド環境を構築し、起動します。

   ```bash
   docker-compose up --build
   ```

3. サンプルデータを挿入する場合、GraphQL Playground でミューテーションを実行します。

## ディレクトリ構成

- **graphql/schema.ts**: GraphQL のスキーマ（型定義）を記述します。
- **graphql/resolvers.ts**: GraphQL のリゾルバを記述します。各クエリやミューテーションに対応するデータベース操作を実装。
- **lib/prisma.ts**: Prisma クライアントのインスタンスを生成し、再利用可能な形でエクスポートします。
- **pages/api/graphql.ts**: Apollo Server のエンドポイントを作成します。
- **prisma/schema.prisma**: Prisma のデータベーススキーマファイル。データベースモデルの定義が記載されています。

## Apollo Server と GraphQL エンドポイント

**pages/api/graphql.ts** ファイルでは、Apollo Server を利用して GraphQL エンドポイント `/api/graphql` を作成しています。

```typescript
// pages/api/graphql.ts

import { ApolloServer } from "apollo-server-micro";
import { typeDefs } from "../../graphql/schema";
import { resolvers } from "../../graphql/resolvers";

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
});

export default apolloServer.createHandler({ path: "/api/graphql" });
```

このエンドポイントにより、フロントエンドは Apollo Client を介してデータベースからのデータ取得や操作が可能となります。

## Prisma の設定と使用

### Prisma の初期化

`prisma/schema.prisma` でデータベーススキーマを定義し、以下のコマンドでマイグレーションを適用します。

```bash
npx prisma migrate dev --name init
```

### Prisma クライアントの利用

**lib/prisma.ts** にて Prisma クライアントをインスタンス化し、`graphql/resolvers.ts` でデータ操作に使用します。

```typescript
// lib/prisma.ts

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export default prisma;
```

これで Prisma クライアントを利用して、データベースにアクセスできます。
