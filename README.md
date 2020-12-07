# visual-regression-test-sample
12/13 アドベントカレンダーのサンプルコード

## 体験手順

### 前提条件

* node version: 12 ~
* cypress version: ^6.0.1

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