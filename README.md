# visual-regression-test-sample
12/13 アドベントカレンダーのサンプルコード

## 体験手順

### 動作確認条件

* node version: >=12
* cypress version: 6.0.1

上記は筆者の動作させた環境となりますが、nodeのバージョンが異なっても、**恐らく**動きます

### 1. nodeのインストール

Macの人は、[nodebrew](https://github.com/hokaccha/nodebrew)を利用してインストールすると、簡単です。

Windowsの人は、[nodejs](https://nodejs.org/ja/download/)より、インストールを行ってください

### 2. nodeがインストールできたことの確認

nodeにパスが通っていることを確認する
```sh
node -v
v12.15.0
```

### 3. ディレクトリの作成&移動

```sh
mkdir visual-regression-test-sample & cd visual-regression-test-sample
```

### 4. package.jsonの作成

```sh
npm init -y
```

### 5. 確認用HTMLの作成

```sh
mkdir public
touch public/index.html
```

`./public/index.html`に以下の内容をコピペする

```
<h1>visual-regression-test-sample</h1>
<p>これは、12/13アドベントカレンダーのサンプルプログラムです。</p>
```

### 6. サーバーを実行して、HTMLの確認

ローカルHTTPサーバを実行する
```sh
npx http-server public/
```

表示されている`ローカルホスト:Port`にアクセスすると、以下のようなページが表示されるはずです。

![access.png](https://github.com/ksoga-graat/visual-regression-test-sample/blob/main/documents/screenshots/127.0.0.1_8081_.png)


### 7. Cypressのインストール&cypress.jsonの作成

Cypressをインストールする
```sh
npm install cypress --save-dev
```

Cypressの設定ファイルを作成する
```sh
touch cypress.json
```

`./cypress.json`に、以下の内容をコピペする
```json
{}
```

### 8. テストファイルの作成

テストファイルを作成する
```sh
mkdir -p ./cypress/integration
touch cypress/integration/index.spec.js
```

以下の内容を`./cypress/integration//index.spec.js`にコピペ
```
context("index.html", () => {
  beforeEach(() => {
    cy.visit("http://127.0.0.1:8080");
  });

  it("view title", () => {
    cy.get("h1").should("contain", "visual-regression-test-sample");
  });
});
```

### 9. Cypressが動作することの確認

ローカルHTTPサーバーを実行する。
```sh
 npx http-server public/ &
```

Cypressを実行する
```sh
./node_modules/.bin/cypress run
```

以下のようにテストが実行されていれば良いです。

![first-test.png](https://github.com/ksoga-graat/visual-regression-test-sample/blob/main/documents/screenshots/first-test.png)

### 10. VisualRegressionTest用のプラグインを導入する


VisualRegressionTestをCypressで実行するために、次のプラグインを利用します。

[Cypress Image Snapshot](https://github.com/jaredpalmer/cypress-image-snapshot)

`cypress-image-snapshot`をインストールする

```sh
npm install --save-dev cypress-image-snapshot
```

`./cypress/plugins/index.js`の中身を消して、以下の内容をコピペする
```js
const {
  addMatchImageSnapshotPlugin,
} = require('cypress-image-snapshot/plugin');

module.exports = (on, config) => {
  addMatchImageSnapshotPlugin(on, config);
};
```

`./cypress/support/commands.js`の中身を消して、以下の内容をコピペする
```commands.js
import { addMatchImageSnapshotCommand } from 'cypress-image-snapshot/command';

addMatchImageSnapshotCommand();
```
### 11. VisualRegressionTestの基準となる画像を作成する

`./cypress/integration/index.spec.js`に以下をコピペする
```js
context("index.html", () => {
  beforeEach(() => {
    cy.visit("http://127.0.0.1:8080");
  });

  it("Layout is not broken", () => {
    cy.matchImageSnapshot();
  });
});
```

以下を実行する
```sh
./node_modules/.bin/cypress run
```

以下のようにテストが成功していれば良いです。

![base-snapshot.png](https://github.com/ksoga-graat/visual-regression-test-sample/blob/main/documents/screenshots/first-test.png)

### 12. レイアウトが崩れるような修正をする

`./public/index.html`に以下をコピペする

(今回の例: 他人が勝手にpタグにスタイルを追加してしまった)

```html
<h1>visual-regression-test-sample</h1>
<p style="margin:8px">これは、12/13アドベントカレンダーのサンプルプログラムです。</p>
```

### 13. VisualRegressionTestを実行する

テストを実行する
```sh
./node_modules/.bin/cypress run
```

以下のようにテストが失敗していれば、VisualRegressionTestが実行されて、レイアウトの崩れを検知している。

![faild.png](https://github.com/ksoga-graat/visual-regression-test-sample/blob/main/documents/snapshots/index.spec.js/__diff_output__/index.html--Layout-is-not-broken.diff.png)
