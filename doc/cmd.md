
run mongo:
    mongod --dbpath=/data

test time in win:
    powershell -Command "Measure-Command { node dist/modules/c-call.js }"
