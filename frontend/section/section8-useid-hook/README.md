# セクション 8: useId フック

## 概要

React 18 で新たに導入された `useId` フックは、クライアントサイドとサーバーサイドで一貫した ID を生成するために使用されます。この機能により、SSR（サーバーサイドレンダリング）環境やクライアント側のレンダリングでも同じ ID が利用され、一貫性のあるインターフェースを提供できます。

`useId` は主に次のような場面で役立ちます。

- 複数のコンポーネント間で一意な識別子が必要な場合。
- サーバーサイドとクライアントサイドで一致する ID を持たせたい場合。
- フォームの要素やラベルの関連付けなど、アクセシビリティを考慮した実装を行うとき。

このセクションでは、`useId` フックの使い方を学び、React 18 での ID 管理の改善点について理解を深めます。

## 学習内容

1. **useId フックの概要**

   - `useId` フックを使用することで、ユニークな ID を簡単に生成できる点について学びます。
   - サーバーサイドレンダリングでも、クライアントサイドでも一貫した ID を持つことが可能な点を確認します。

2. **フォームやアクセシビリティへの応用**
   - ラベルとフォームの要素を結び付ける際など、アクセシビリティの向上のために `useId` を使用する方法を学びます。

## 実装手順

1. **サンプルコードの作成**

   - `src/components/Section8.tsx` ファイルを作成し、`useId` を使ったサンプルコンポーネントを実装します。

   ```tsx
   import React, { useId } from "react";

   const Section8: React.FC = () => {
     const id = useId();

     return (
       <div className="flex flex-col items-center mt-10">
         <h2 className="text-3xl font-bold mb-5">useId Hook Example</h2>
         <div className="mb-4">
           <label htmlFor={id} className="block text-lg font-medium">
             Enter your name:
           </label>
           <input
             type="text"
             id={id}
             className="input input-bordered w-full max-w-xs mt-2"
             placeholder="Your name"
           />
         </div>
       </div>
     );
   };

   export default Section8;
   ```

2. **`App.tsx` にコンポーネントを追加**

   - 作成した `Section8` コンポーネントを `src/App.tsx` に追加して、動作を確認できるようにします。

   ```tsx
   import React from "react";
   import Section8 from "./components/Section8";

   const App: React.FC = () => {
     return (
       <div>
         <Section8 />
       </div>
     );
   };

   export default App;
   ```

3. **動作確認**
   - `docker-compose up` でプロジェクトを起動し、`http://localhost:3000` にアクセスしてください。
   - 入力フィールドが表示され、`useId` を使用してラベルと入力フィールドが適切に関連付けられていることを確認します。

## まとめ

このセクションでは、React 18 の `useId` フックを使って、クライアントサイドとサーバーサイドの一貫した ID 管理を実現する方法を学びました。特に、アクセシビリティを考慮した実装において役立つ点を確認し、フォームのラベルと入力フィールドの関連付けを簡単に行えることを理解しました。
