# Day5
------
#git 的 branch 操作
通常一個專案，在開發過程中會分成至少三個 Branch(分支): master, dev, feature branch(功能開發分支)。
1. master: 確定能夠上架的分支。發佈到 github上，供上架安裝。
2. dev: 開發分支。發佈到 github上。因為，會有協同開發，或是單人多機開發的需要。所以，發佈到 github 上共享。
3. feature branch: 功能分支，每開發一個功能即從dev產生一個分支，以功能命名這個分支。等功能開發完畢後，再匯入到dev分支。匯入後，即刪除這個分支。

產生新分支
```
git checkout -b new-branch
```
列示分支
```
git branch
```
切換分支
```
git checkout branch-to-switch-to
```
匯入分支
```
git checkout main-branch   <---先切換到要匯入得主分支
git merge --no-ff feature-branch <---再匯入 feature-branch
```
加入新增檔案
```
git add new-file-1 new-file-2
```
提交變更
```
git commit -a -m"Commit change"
```
刪除分支
```
git branch -d branch-to-be-deleted
```
##實例演練：ex4-1的操作
取回專案:
```
git clone https://github.com/stone123p/hzy.git
```
切換目錄:
```
cd hzy
```
從 master 產生 dev 分支
```
git checkout -b dev
```
從 dev 產生 ex4-1 功能分支
```
git checkout -b ex4-1
```
#### 開發程式：過程中會新增一些檔案，或更改原有的程式碼。
將新增的檔案加入
```
git add new-file-1 new-file-2 new-file-3
```
提交變更
```
git commit -a -m"ex4-1 completed"
```
確定 ex4-1 已經完畢，無需再持續開發後，提交變更：
```
git commit -a -m"No more ex4-1"
```
切換到 dev 分支
```
git checkout dev
```
在 dev 分支中，匯入 ex4-1分支：
```
git merge --no-ff ex4-1
```
將 dev 分支發佈到 github
```
git push origin dev
```
刪除ex4-1分支
``` 
git branch -d ex4-1
```


------
#A Very Simple Project
這個專題將製作一個非常非常非常簡單的留言系統。為了能專注學習如何整合React.js，node.js，以及mongodb，所以，刻意忽略掉一些功能。
在這個留言板，我們允許使用者，新增(Create)，列示(Read)，更新(Update)，刪除(Delte)留言。把CRUD(Create, Read, Update, Delete)的資料操作，透過網站的RESTFul API，把使用者的留言，紀錄於資料庫。

即使是這麼非常簡單的留言版，也是複雜到無法立即解決的問題。所以，我們必須採取Divide and Conquer(分割然後征服)的策略，將問題切割成一個個小問題，一直切割到容易解決為止，再來逐一解決這些問題。

所以，我們先把問題切割開來。先切割成大問題，來形成我們的架構，再逐步切割。

留言板的問題，可先切割成

```
1. 用戶端瀏覽器的UI(使用者介面)
2. 伺服器端的API(應用程式開發介面)
3. 瀏覽器與伺服器之間資料交換
```

分割成大問題以後，我們再來切割成較小的問題
```
1. 用戶端瀏覽器的UI(使用者介面)
   1.1 留言板資料的呈現。
   1.2 留言板的新增，更新，刪除等操作介面。
   1.3 上面操作介面的事件處理函式。
   1.4 頁面資料的更新。
   
2. 伺服器端的API(應用程式開發介面)
   2.1 資料庫Schema 的定義
   2.2 伺服器端 API 的路徑指定
   2.3 對應API路徑的處理函式

3. 瀏覽器與伺服器之間資料交換
   3.1 採用json格式。
```

問題切割到此，差不多可以開始動手解決問題了。在開發的過程當中，我們會把程式碼按照執行的功能，切割到不同的檔案，讓程式可以模組化。這樣，程式碼會更容易維護。

#分工合作
分工合作這個詞被說到爛了，以至於，聽個這四個字超級無感，無感到潛意識就判定他是口號。
所以，在這個專案，必須定義所謂的分工合作。到底分工要做哪些事情？又有哪些工作必須合作。雖然，我們是只有一個人來開發所有的程式碼，但是，我們可以按照工作的性質，分成兩個角色，一人兩化。把自己分成兩個角色來開發專案，可以讓我們更專注手頭上的工作，同時讓程式碼具有高凝聚低耦合的特性。
現在假設我們有兩個程式設計師在開發這個專案。一個負責前端瀏覽器應用程式的開發，一個負責後端伺服器API的開發。
分工，就是要讓這兩個人能夠獨立作業，不致於影響彼此的作業。
合作，就是要在專案開始初期，共同定義前後端資料交換的格式與介面。在整合時，能夠共同發掘問題，解決問題。
前端程式碼，將使用React.js 來開發使用者介面的應用程式，並使用jquery的ajax與伺服器端做資料交換。
後端程式碼，將使用node express.js來開發後端API，將資料寫入MongoDB資料庫。


