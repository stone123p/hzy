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


