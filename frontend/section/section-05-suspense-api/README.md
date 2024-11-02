# セクション 5: Suspense API の強化

## 概要

React 18 では、`Suspense` の使い方が大幅に強化されました。`Suspense` は、非同期データの取得中にユーザーに対して「待機状態」を表示するためのコンポーネントです。これにより、データ取得中のユーザー体験が向上し、よりスムーズなインターフェースを提供できます。

特に React 18 では、サーバーサイドレンダリング（SSR）と `Suspense` を組み合わせたストリーミングでのレンダリングが可能になり、部分的に素早くレンダリングすることができます。このセクションでは、クライアントサイドでの `Suspense` の使い方に加え、バックエンドからデータを取得するまでのユーザー体験について学びます。

## 学習内容

1. **Suspense の基本的な理解と設定方法**：
   - `Suspense` を使用して、データ取得中にローディング画面を表示する方法を学びます。

2. **React 18 における Suspense の新機能の理解**：
   - `React.lazy()` を使用して遅延ロードするコンポーネントのラップ。
   - サーバーサイドレンダリングでのデータストリーミングと組み合わせる利点を理解します。

3. **React クライアントの Suspense と API フェッチの組み合わせ**：
   - クライアントサイドの `Suspense` と非同期フェッチを組み合わせ、ローディングの状態をうまく扱う方法を学びます。

## 実装手順

1. **バックエンド API の準備**：
   - 既に設定されているバックエンドの GraphQL API を使用します。ユーザーデータを取得するためのエンドポイントを使います。

2. **サンプルコードの作成**：
   - `src/components/Section5.tsx` というファイルを作成し、`Suspense` コンポーネントを使って、API からデータを取得し、待機状態を表示するロジックを実装します。

   ```tsx
   import React, { Suspense, lazy } from "react";

   const UserList = lazy(() => import("./UserList"));

   const Section5: React.FC = () => {
     return (
       <div className="flex flex-col items-center mt-10">
         <h2 className="text-3xl font-bold mb-5">Suspense API Example with Lazy Loading</h2>
         <Suspense fallback={<div>Loading user data...</div>}>
           <UserList />
         </Suspense>
       </div>
     );
   };

   export default Section5;
   ```

   - `UserList` コンポーネントを別のファイル `UserList.tsx` に分けて保存します。

   ```tsx
   // src/components/UserList.tsx
   import React, { useEffect, useState } from "react";

   const UserList: React.FC = () => {
     const [users, setUsers] = useState<any[]>([]);
     const [loading, setLoading] = useState(true);

     useEffect(() => {
       const fetchData = async () => {
         setLoading(true);
         const response = await fetch("http://localhost:4000/api/graphql", {
           method: "POST",
           headers: { "Content-Type": "application/json" },
           body: JSON.stringify({
             query: `{
               users {
                 id
                 name
                 email
               }
             }`,
           }),
         });
         const { data } = await response.json();
         setUsers(data.users);
         setLoading(false);
       };

       fetchData();
     }, []);

     if (loading) {
       return <div>Loading...</div>;
     }

     return (
       <ul>
         {users.map((user) => (
           <li key={user.id}>
             {user.name} ({user.email})
           </li>
         ))}
       </ul>
     );
   };

   export default UserList;
   ```

3. **`App.tsx` にコンポーネントを追加**：
   - 作成した `Section5` コンポーネントを `src/App.tsx` に追加して、動作を確認できるようにします。

   ```tsx
   import React from "react";
   import Section5 from "./components/Section5";

   const App: React.FC = () => {
     return (
       <div>
         <Section5 />
       </div>
     );
   };

   export default App;
   ```

4. **動作確認**：
   - `docker-compose up` でプロジェクトを起動し、`http://localhost:3000` にアクセスしてください。
   - `Suspense` コンポーネントを使用して、ユーザーデータがフェッチされる間、「Loading user data...」と表示されることを確認します。
   - ユーザーデータの取得後にリストが表示されることを確認します。

## まとめ

このセクションでは、React 18 の `Suspense` の強化点について学びました。特に、API フェッチと組み合わせてローディング状態を管理する方法を理解し、`Suspense` によるスムーズなユーザー体験を提供する実装を行いました。

React 18 の `Suspense` により、非同期データの取得中でも適切なフィードバックをユーザーに提供できるようになり、より洗練されたユーザーインターフェースを実現できます。また、`React.lazy()` を使ってコンポーネントを遅延ロードすることで、初期ロード時のパフォーマンス向上も実現しました。

