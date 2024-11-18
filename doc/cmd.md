
run mongo:
    mongod --dbpath=/data

test time in win:
    powershell -Command "Measure-Command { node build/modules/c-call.js }"

upgrade packages:
    yarn upgrade --latest
