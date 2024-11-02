# セクション 1: createRoot API の導入

## 概要

このセクションでは、React 18 で導入された `createRoot` API を用いて、アプリケーションを並列レンダリング対応にします。`createRoot` API は React アプリケーションの基盤をより効率的にし、パフォーマンス向上を可能にします。

## 学習ポイント

- **createRoot API**: `createRoot` を用いることで、React 18 の新しいレンダリングエンジンを利用し、並列レンダリングを有効にすることができます。
- **並列レンダリング**: React 18 の目標の一つは、よりスムーズなユーザー体験を提供するために、レンダリングのパフォーマンスを向上させることです。

## 実装手順

1. `src/index.tsx` を開きます。
2. 以下のように、従来の `ReactDOM.render` を `createRoot` に置き換えます。

   ```tsx
   import React from "react";
   import { createRoot } from "react-dom/client";
   import App from "./App";
   import "./index.css";
   const container = document.getElementById("root");
   const root = createRoot(container!);
   root.render(
     <React.StrictMode>
       <App />
     </React.StrictMode>
   );
   ```

3. 変更を保存します。

## 動作確認方法

1. **Docker Compose の起動**

   以下のコマンドでプロジェクトを起動します。

   ```bash
   docker-compose up --build
   ```

2. **ブラウザでの確認**

   ブラウザで `http://localhost:3000` にアクセスし、エラーがなくアプリケーションがレンダリングされていることを確認してください。

## 注意点

- **React 18 の変更点**: `createRoot` を使用することで、従来の `ReactDOM.render` とは異なるレンダリング挙動があるため、注意が必要です。
- **React.StrictMode**: `React.StrictMode` を使用することで、開発中に潜在的な問題を検出することができます。

## 追加学習リソース

- [React 18 の公式ドキュメント](https://reactjs.org/docs/strict-mode.html)
- [React 18 の新機能について](https://reactjs.org/blog/2022/03/29/react-v18.html)

---
