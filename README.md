# 老爸的私房錢

這是一份為了老爸打造的網路記帳本，可以讓使用者新增、修改與刪除「支出紀錄」。

## 目錄

- [功能](#功能)
- [環境](#環境)
- [安裝](#安裝)
- [開發工具](#開發工具)

## 功能

- **使用者登入：** 使用者可以進行註冊登入並建立自己的記帳本，也可利用Facebook直接登入。

- **瀏覽支出項目：** 使用者可以瀏覽記帳本，查看自己的支出項目、日期、金額及總支出金額。

- **根據類別篩選：** 使用者可以根據類別篩選支出項目，同時總金額也隨之變換。

- **新增/刪除/編輯項目：** 使用者可以根據個人需求編輯支出紀錄。

## 環境
請先確保已安裝 Node.js 和 npm 。

## 安裝

1. 將專案clone到本地:
```
git clone (https://github.com/ciao0603/expense-tracker.git)
```
2. 在本地開啟專案:
```
cd expense-tracker
```
3. 下載相關套件:
```
npm i
```
4. 參考.env範例設定環境變數:
```
MONGODB_URI=mongodb://localhost/expense-tracker
SESSION_SECRET=ThisTsASecret
FACEBOOK_ID=SKIP
FACEBOOK_SECRET=SKIP
FACEBOOK_CALLBACK=http://localhost:3000/auth/facebook/callback
PORT=3000
```
5. 載入種子資料:
```
npm run seed
```
6. 啟動專案:
```
npm run start
```
7. 如果看到這行字代表啟動成功，輸入網址即可進入應用程式:
```
Running on localhast:3000
```
8. 確認資料庫是否連線成功:
```
// 連線成功
mongoDB connected
// 連線失敗
mongoDB error
```
9. 如需停止請輸入
```
ctrl+C
```

## 開發工具
+ Node.js 18.16.1
+ Express 4.18.2
+ Express-Handlebars 4.0.2
+ Bootstrap 5.1.3
+ Font-awesome 5.8.1
+ MongoDB
+ bootswatch
+ Mongoose 7.4.1
+ Dotenv 16.3.1
+ Method-override 3.0.0
+ Bcryptjs 2.4.3
+ Connect-flash 0.1.1
+ Express-session 1.17.1
+ Passport 0.4.1
+ Passport-local 1.0.0
+ Passport-facebook 3.0.0
+ Dayjs 1.11.9
