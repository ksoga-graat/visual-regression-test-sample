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

```sh
$ node -v
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

```
mkdir public
echo "<h1>visual-regression-test-sample</h1><p>これは、12/13アドベントカレンダーのサンプルプログラムです。</p>"
```

### 6. サーバーを実行して、HTMLの確認

```sh
$ npx http-server public/

Starting up http-server, serving public/
Available on:
  http://127.0.0.1:8080
  http://192.168.3.6:8080
  http://192.168.3.12:8080
Hit CTRL-C to stop the server
```

表示されているローカルホスト:Portにアクセスすると、ページが表示されるはずです。


### 7. Cypressのインストール&cypress.jsonの作成

```sh
npm install cypress --save-dev
echo "{}"> cypress.json
```

### 8. テストファイルの作成

```sh
mkdir -p ./cypress/integration
touch cypress/integration/index.spec.js
```

### 9. テストが落ちることの確認

以下の内容を`index.spec.js`にコピペ
```
context("index.html", () => {
  beforeEach(() => {
    cy.visit("http://127.0.0.1:8080");
  });

  it("view title", () => {
    cy.get("h1").should("contain", "!visual-regression-test-sample");
  });
});
```

```sh
 npx http-server public/ &
./node_modules/.bin/cypress run
```

テストが終了すると、`/path/visual-regression-test-sample/cypress/screenshots/index.spec.js/`フォルダの中に、`index.html -- view title (failed).png`という失敗時のスクリーンショットが保存される。

![faild.png](https://github.com/ksoga-graat/visual-regression-test-sample/blob/main/documents/screenshots/index.spec.js/index.html--view-title(failed).png)

### 9. テストを成功させる

以下の内容を`index.spec.js`にコピペ
```js
context("index.html", () => {
  beforeEach(() => {
    cy.visit("http://127.0.0.1:8080");
  });

  it("view title", () => {
    cy.get("h1").should("contain", "visual-regression-test-sample");
  });
});
```

### VisualRegressionTest用のプラグインを導入する


VisualRegressionTestをCypressで実行するために、次のプラグインを利用します。

[Cypress Image Snapshot](https://github.com/jaredpalmer/cypress-image-snapshot)

```sh
npm install --save-dev cypress-image-snapshot
```

`./cypress/plugins/index.js`に以下の内容をコピペする
```js
const {
  addMatchImageSnapshotPlugin,
} = require('cypress-image-snapshot/plugin');

module.exports = (on, config) => {
  addMatchImageSnapshotPlugin(on, config);
};
```

`./cypress/support/commands.js`に以下の内容をコピペする
```commands.js
import { addMatchImageSnapshotCommand } from 'cypress-image-snapshot/command';

addMatchImageSnapshotCommand();
```
### VisualRegressionTestの基準となる画像を作成する

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

### レイアウトが崩れるような修正をする

`./public/index.html`に以下をコピペする

(例: 他人が勝手にpタグのスタイルを追加してしまった)

```html
<h1>visual-regression-test-sample</h1>
<p style="margin:8px">これは、12/13アドベントカレンダーのサンプルプログラムです。</p>

```

テストを実行する
```sh
./node_modules/.bin/cypress run
```

![faild.png](https://github.com/ksoga-graat/visual-regression-test-sample/blob/main/documents/snapshots/index.spec.js/__diff_output__/index.html--Layout-is-not-broken.diff.png)
