# セクション 2: イベントシステムの変更（React 17）

## 概要

React 17 では、イベントシステムに重要な変更が加えられました。これにより、バブリングの動作が改善され、React アプリケーションがより柔軟に他のライブラリや既存のコードベースと共存できるようになりました。

このセクションでは、React 17 のイベントシステムの変更を学び、その影響と利点について理解します。

## 学習内容

1. **イベントバブリングの変更**：

   - 従来の React では、すべてのイベントが`document`レベルでリスニングされていましたが、React 17 からはルートコンテナにバインドされるようになりました。
   - これにより、React のイベントが他のライブラリと干渉しにくくなり、柔軟なイベント管理が可能になります。

2. **イベントの伝播の影響**：

   - 新しいイベントシステムの導入により、React と他の JavaScript ライブラリ間でイベントの干渉が減少します。
   - 具体的には、ルート要素外のイベントバブリングが発生しないため、他のスクリプトによる予期しない影響を避けることができます。

## 実装手順

1. **既存コードの動作確認**：

   - まず、既存のイベントリスナーの動作を確認しましょう。特に、React コンポーネントと DOM 直接操作を組み合わせている部分での違いを確認します。

2. **サンプルコードの作成**：

   - `src/components/Section-2.tsx`というファイルを作成し、クリックイベントをハンドリングするシンプルなコンポーネントを実装します。
   - DaisyUI を使って視覚的に美しいボタンを追加し、新しいイベントシステムの動作を確認します。

   ```tsx
   import React from "react";

   const Section1: React.FC = () => {
     const handleRootClick = () => {
       console.log("Root element clicked");
     };

     const handleChildClick = (e: React.MouseEvent<HTMLButtonElement>) => {
       e.stopPropagation();
       console.log("Child element clicked");
     };

     return (
       <div
         onClick={handleRootClick}
         className="flex flex-col items-center justify-center h-screen bg-base-200"
       >
         <div className="text-center mb-10">
           <h1 className="text-4xl font-bold mb-5">
             React 17 Event System Changes
           </h1>
           <p className="text-lg text-gray-700 mb-5">
             Click on the button to see how events are propagated in React 17.
           </p>
         </div>
         <button onClick={handleChildClick} className="btn btn-primary">
           Click me (Child)
         </button>
       </div>
     );
   };

   export default Section1;
   ```

3. **`App.tsx` に追加**：

   - 作成した `Section1` コンポーネントを `src/App.tsx` に追加して、動作を確認できるようにします。

   ```tsx
   import React from "react";
   import Section1 from "./components/Section2";

   const App: React.FC = () => {
     return (
       <div>
         <Section2 />
       </div>
     );
   };

   export default App;
   ```

4. **動作確認**：

   - `docker-compose up` でプロジェクトを起動し、`http://localhost:3000` にアクセスしてください。
   - 上記で作成した `Section1` コンポーネントを画面に追加し、子要素と親要素をクリックして、コンソールのログを確認します。
   - 新しいイベントシステムにより、イベントがルート要素までバブリングするかどうかを確認します。

## 動作確認方法

- `docker-compose up` でプロジェクトを起動し、`http://localhost:3000` にアクセスしてください。
- 子要素と親要素をクリックして、イベントのバブリングの動作を確認します。
- 新しいイベントシステムにより、イベントがどのように伝播するか、`stopPropagation()` の影響を確認してください。

## まとめ

このセクションでは、React 17 のイベントシステムの変更点について学びました。特に、イベントバブリングが `document` からルート要素にバインドされることで、他のスクリプトやライブラリとの共存がしやすくなったことを理解しました。

次のセクションでは、**新しい JSX トランスフォーム（React 17）** について学習します。
