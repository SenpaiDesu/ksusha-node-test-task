const cluster = require('cluster');
const { cpus } = require('os');
const fs = require('fs');

if (cluster.isMaster) {
  for (let i = 0; i < cpus().length; i++) 
    cluster.fork()
      .on('message', message => {
        if (message.signal == 'sendTask')
          for (let id in cluster.workers)
            cluster.workers[id].send(message.payload);
        
        else if (message.signal == 'receiveResult') {
          const storePath = __dirname + '/data/tasks.json';
          const data = JSON.parse(fs.readFileSync(storePath, 'utf8'));
          data.tasks.push(message.payload);
          const json = JSON.stringify(data, null, 2);
          fs.writeFileSync(storePath, json);
        }
      });
      
  console.log(`process ${process.pid} is ready for party!`);
}
else {
  console.log(`process ${process.pid} is ready for party!`);
  require('./worker');
  require('./server');
}
