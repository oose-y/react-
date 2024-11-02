# セクション 4: 自動バッチ処理（React 18）

## 概要

React 18 では、状態更新に関する自動バッチ処理が導入されました。これにより、複数の状態更新が同時に行われる場合、それらをまとめて実行することで、レンダリングの回数を削減し、パフォーマンスを向上させることができます。このセクションでは、React 18 の自動バッチ処理がどのように動作するかを学びます。

従来の React 17 以前では、非同期イベント（例えば、タイマーや API コール）の中で複数の状態更新があると、それぞれが個別にレンダリングを引き起こすことがありました。しかし、React 18 では、これらの状態更新が自動的にバッチ処理され、1 回のレンダリングにまとめられます。これにより、アプリケーションのパフォーマンスが向上します。

例えば、React 17 では、`setCountA` と `setCountB` のように複数の状態を更新する場合、それぞれの状態更新ごとにレンダリングが発生する可能性がありました。しかし、React 18 では、これらの状態更新が自動的にまとめられ、1 度のレンダリングで済むようになります。

React 18 の自動バッチ処理により、状態更新が異なるタイミングで発生しても、それらが効率的にまとめてレンダリングされます。これにより、複数の状態変更がある場合でも、より滑らかなユーザー体験を提供できます。

## 学習内容

1. **React 18 での自動バッチ処理の理解**：

   - React 18 からは、非同期イベント（例えば、タイマーや API コール）の中で複数の状態更新があった場合、それらが自動的にバッチ処理されるようになりました。
   - これにより、レンダリングの回数が減少し、パフォーマンスが向上します。

2. **自動バッチ処理の動作確認**：

   - ボタンをクリックするなどのユーザー操作による複数の状態更新が、個別にレンダリングされるのではなく、まとめて行われる様子を確認します。

## 実装手順

1. **サンプルコードの作成**：

   - `src/components/Section4.tsx` というファイルを作成し、複数の状態更新を伴うコンポーネントを実装します。

   ```tsx
   import React, { useState } from "react";

   const Section4: React.FC = () => {
     const [countA, setCountA] = useState(0);
     const [countB, setCountB] = useState(0);

     const handleClick = () => {
       setTimeout(() => {
         setCountA((prev) => prev + 1);
         setCountB((prev) => prev + 1);
       }, 1000); // 両方を同時に1秒遅延で実行
     };

     return (
       <div className="flex flex-col items-center mt-10">
         <h2 className="text-3xl font-bold mb-5">
           Automatic Batching in React 18
         </h2>
         <p className="text-lg mb-3">Count A: {countA}</p>
         <p className="text-lg mb-3">Count B: {countB}</p>
         <button onClick={handleClick} className="btn btn-primary">
           Increment Counts
         </button>
       </div>
     );
   };

   export default Section4;
   ```

2. **`App.tsx` にコンポーネントを追加**：

   - 作成した `Section4` コンポーネントを `src/App.tsx` に追加して、動作を確認できるようにします。

   ```tsx
   import React from "react";
   import Section4 from "./components/Section4";

   const App: React.FC = () => {
     return (
       <div>
         <Section4 />
       </div>
     );
   };

   export default App;
   ```

3. **動作確認**：

   - `docker-compose up` でプロジェクトを起動し、`http://localhost:3000` にアクセスしてください。
   - 「Increment Counts」ボタンをクリックし、`countA` と `countB` の両方がそれぞれの遅延後に増加することを確認します。
   - コンソールを確認して、状態更新がバッチ処理されており、レンダリングが 1 回のみ行われていることを確認します。

## まとめ

このセクションでは、React 18 の自動バッチ処理について学びました。特に、複数の状態更新が同時に発生した場合に、それらがまとめて処理されることで、レンダリングの回数が削減され、アプリケーションのパフォーマンスが向上する点を理解しました。

React 18 の自動バッチ処理により、状態更新の効率が向上し、複雑なユーザーインタラクションに対してもスムーズに対応できるようになります。これにより、開発者は個々の状態更新のレンダリングを気にせず、よりシンプルにコードを書くことができます。

また、今回の実装では、`countA` と `countB` の更新に異なる遅延を加えることで、React 18 のバッチ処理がどのように機能するかを視覚的に確認しました。これにより、複数の状態更新が発生しても、最終的に一度のレンダリングで全ての変更が反映されることを体験しました。
