# セクション 3: コンポーネントの再マウント回避と状態管理（React 17）

## 概要

React 17 では、イベントシステムの変更により他のライブラリとの干渉が減少し、複雑なシナリオでの安定性が増しました。しかし、コンポーネントの再マウントを直接的に防ぐ機能が追加されたわけではなく、再マウントの回避には適切な状態管理が必要です。このセクションでは、コンポーネントの再マウントを防ぐための状態管理方法を学びます。

例えば、ナビゲーションメニューやフォームの入力状態など、状態を保持したいコンポーネントに対して再マウントを防ぐ方法を理解します。

## 学習内容

1. **React 17 のイベントシステム変更の理解**：

   - React 17 では、イベントのバブリングの仕組みが変更され、React 外のスクリプトと干渉しにくくなり、複雑なシナリオでの安定性が向上しました。
   - これにより、複数の React バージョンが共存する環境での互換性が向上し、アプリケーションの安定性が増します。

2. **再マウントによる状態リセットの防止**：

   - フォームや入力フィールドなどのコンポーネントの状態が不要にリセットされることを防ぐために、状態を親コンポーネントで管理する方法を学びます。

## 実装手順

1. **既存コードの確認**：

   - 再マウントによって問題が発生しやすいシナリオを確認します。特に、状態を保持しているフォームやユーザー入力がリセットされないようにするための対策を学びます。

2. **サンプルコードの作成**：

   - `src/components/Section3.tsx` というファイルを作成し、フォームコンポーネントを実装します。
   - このフォームで、入力フィールドに入力された値が再マウントによってリセットされないことを確認します。

   ```tsx
   import React, { Dispatch, SetStateAction } from "react";

   interface Section3Props {
     inputValue: string;
     setInputValue: Dispatch<SetStateAction<string>>;
   }

   const Section3: React.FC<Section3Props> = ({
     inputValue,
     setInputValue,
   }) => {
     const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
       setInputValue(e.target.value);
     };

     return (
       <div className="flex flex-col items-center mt-10">
         <h2 className="text-3xl font-bold mb-5">Avoid Component Remount</h2>
         <input
           type="text"
           value={inputValue}
           onChange={handleInputChange}
           className="input input-bordered w-full max-w-xs"
           placeholder="Type something..."
         />
       </div>
     );
   };

   export default Section3;
   ```

3. **`App.tsx` にテスト用コンポーネントを追加**：

   - `Section3` と切り替えられるテスト用の別コンポーネント `TestComponent` を作成して、切り替えによる再マウントの回避を確認します。

   - `src/components/TestComponent.tsx` を作成します：

   ```tsx
   import React from "react";

   const TestComponent: React.FC = () => {
     return (
       <div className="flex flex-col items-center mt-10">
         <h2 className="text-3xl font-bold mb-5">Test Component</h2>
         <p>This is a component to test remounting behavior.</p>
       </div>
     );
   };

   export default TestComponent;
   ```

   - `App.tsx` を修正してコンポーネントを切り替えられるようにします：

   ```tsx
   import React, { useState } from "react";
   import Section3 from "./components/Section3";
   import TestComponent from "./components/TestComponent";

   const App: React.FC = () => {
     const [inputValue, setInputValue] = useState("");
     const [showSection3, setShowSection3] = useState(true);

     const toggleSection = () => {
       setShowSection3(!showSection3);
     };

     return (
       <div>
         <button onClick={toggleSection} className="btn btn-primary m-5">
           {showSection3 ? "Show Test Component" : "Show Section 3"}
         </button>
         {showSection3 ? (
           <Section3 inputValue={inputValue} setInputValue={setInputValue} />
         ) : (
           <TestComponent />
         )}
       </div>
     );
   };

   export default App;
   ```

4. **動作確認**：

   - `docker-compose up` でプロジェクトを起動し、`http://localhost:3000` にアクセスしてください。
   - フォームに入力し、「Show Test Component」ボタンをクリックして他のセクションに切り替えます。
   - 再度ボタンをクリックして `Section3` に戻ったとき、入力した値がそのまま保持されていることを確認します。

## まとめ

このセクションでは、React 17 のイベントシステムの変更による安定性の向上と、状態管理を適切に行うことでコンポーネントの再マウントを回避する方法について学びました。特に、ユーザー入力が不要にリセットされないようにすることで、ユーザーエクスペリエンスを向上させる方法を理解しました。
