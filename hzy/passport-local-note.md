# Passport and local strategy note
------

## 參考文章
1. http://toon.io/understanding-passportjs-authentication-flow/
2. http://toon.io/on-passportjs-specific-use-cases/

## 設定 Passport 的三個步驟：
1. require passport 模組，然後用 app 來 use：passport.initialize()和 passport.session() 這兩個 middleware。(通常在 app.js 做這個步驟)
2. 設定至少一個 Strategy，定義 passport 的 serializeUser 和 deserializeUser這兩個方法。(可撰寫一個通用 Controller ，來執行這個步驟)
3. 指定一個路徑(通常是 app.post('/login'))，使用 passport.authenticate 這個 middleware來實際驗證使用者的登入資料。 authenticate須指定所使用的 Strategy。
## 身份驗證的流程：(假設驗證的路徑為 /login)
app.post('/login', passport.authenticate('local', {failureRedirect: '/login'}), requestHandler)
1. 當鄉民按下登入的按鈕，瀏覽器即針對表單所指定的路徑(/login)發送Post request，伺服器收到這個 request ，執行 passport.authenticate 這個 middleware。
2. authenticate 這個 middleware 呼叫其指定的 Strategy。(我們在上面第三個步驟指定的Strategy)。Strategy實際執行的內容，在上面第二個步驟中定義。
3. 在定義 Strategy 時，須定義一個驗證的函式。Passport 會把 req.body.username和 req.body.password 傳遞給這個驗證函式處理。
4. 在這個驗證函式裡面，我們從資料庫中找出這個 username 的使用者，然後驗證其password。
5. 連線資料庫發生問題：done(err)。
   找不到使用者或密碼錯誤：done(null, false)。
   沒問題：done(null, user)。
6. 上面的 done 就是執行 authenticate 的回傳函式(password有內定的，但我們也可自行定義，參考 passportjs.org 的 Custom Callback)。參數依次為： error, user, info
7. 若正確傳回 user ，authenticate 這個 middleware就會呼叫 req.logIn
8. req.login 會呼叫 passport.serializeUser(user, done)。在這個函式中決定，要存放user物件中的哪些資料到session裡面(通常存放id，之後deserializeUser就以這個id自資料庫中查詢出user的資料。所以，有另一派認為，為了避免存取要驗證的網頁時，都要做資料庫的查詢動作，建議，在serializeUser時，在session裡存放整個user的物件)。serializeUser方法的執行結果，會加掛在session，存放在req.session.passport.user變數。
9. serializeUser方法的執行結果，也會存放在req.user變數。
10. app.post('/login', passport.authenticate('local', {failureRedirect: '/login'}), requestHandler)。 整個登入流程最後執行 requestHandler，通常是重導至登入成功的頁面。

## 驗證後的流程
後續瀏覽器提出要求時：
1. 伺服器會載入 session 的資料，然後加掛在req物件，之前驗證時，passport已經把序列化的 user 物件資料加掛在 session。存放在 req.session.passport.user變數。
2. 伺服器執行之前設定的 middleware。app.use(passport.initialize())。如果已經驗證身份，middleware 會找出加掛在 session 的 passport.user 變數。否則，會初始化一個 req.session.passport.user={}的空物件。 
3. 接下來呼叫下一個 middleware。app.use(passport.session())。如果，在session中找到序列化 user 物件的資料，就認定這個要求已經驗證過身份。
4. passport.session middleware 會執行我們所定義的 deserializeUser，把req.session.passport.user 從序列化還原為完整的 user 物件，存放在 req.user變數。

## Passport 方法與middleware 摘要說明
1. passport.initialize middleware，每次收到瀏覽器的request 都會執行這個 middleware。它確保 session 變數中包含了 passport.user 這個物件。如果沒有的話，它會產生一個空物件來初始化 req.session.passport.user。
2. passport.session middleware，如果已驗證身份，就會呼叫passport.deserializeUser，把 session 中序列化的 passport.user 資料，還原為原本的 user 物件。
3. passport.deserializeUser，由possport.session 所呼叫，定義了如何把序列化的資料還原回原本的 user 物件。然後由 passport.session 所傳遞過來的 done 回呼函式，把 user 物件存成 req.user。
4. 我們所定義的 Local Strategy 只有在有使用 passport.authenticate middleware的路徑時，才會被執行。這個路徑通常是登入的端點。
5. 只有在passport.authenticate middleware 執行驗證時，才會執行 passport.serializeUser。我們在定義這個方法時，決定 user 物件的哪些部分需要序列化，存放在session裡。
 

