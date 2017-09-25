function runCode(code){
  return eval(code);
}

process.on('message', message => {
  console.log(message);
  const createdAt = new Date().toString();
  const result = runCode(message.task);
  console.log(`${process.pid} get result!`);
  process.send({
    signal: 'receiveResult',
    payload: {
      userId: message.userId,
      task: message.task,
      pid: process.pid,
      result,
      createdAt
    }
  });
});
