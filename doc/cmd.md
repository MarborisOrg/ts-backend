run mongo:
mongod --dbpath=/data

test time in win:
powershell -Command "Measure-Command { node build/modules/c-call.js }"

upgrade packages:
yarn upgrade --latest

powershell:
for ($i = 1; $i -le 100; $i++) { git commit --allow-empty -m "mrb: just thinking $i" }
