# Enable OS X Postfix
------
## Modify main.cf
```
sudo vi /etc/postfix/main.cf
```
Replace localhost with 127.0.0.1
```
#inet_interfaces = localhost
inet_interfaces = 127.0.0.1
```
## Modify postfix plist
```
sudo vi /System/Library/LaunchDaemons/org.postfix.master.plist
```
add following line before the closing </dict> tag:
```
<key>RunAtLoad</key> <true/> <key>KeepAlive</key> <true/>
```
start service
```
sudo postfix start
```

