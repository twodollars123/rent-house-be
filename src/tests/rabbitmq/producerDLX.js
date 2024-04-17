const amqp = require("amqplib");

const log = console.log;
console.log = function () {
  log.apply(console, [new Date()].concat(arguments));
};
const runProducer = async () => {
  try {
    const connection = await amqp.connect("amqp://guest:12345@localhost");
    const channel = await connection.createChannel();

    const notificationExchange = "notificationEx"; //notificationEx direct
    const notiQueue = "notificationQueueProcess"; // assertQueue
    const notificationExchageDLX = "notificationExDLX"; //notificationEx direct
    const notificationRoutingKeyDLX = "notificationRoutingKeyDLX"; //assert

    //1. create Exchange
    await channel.assertExchange(notificationExchange, "direct", {
      durable: true,
    });
    //2. create queue
    const queueResult = await channel.assertQueue(notiQueue, {
      exclusive: false, //cho phep cac ket noi truy cap cung mot luc hang doi
      deadLetterExchange: notificationExchageDLX,
      deadLetterRoutingKey: notificationRoutingKeyDLX,
    });
    //3. bindQueue
    await channel.bindQueue(queueResult.queue, notificationExchange);
    //4. send message to consumer
    const message = "test 1: Vua moi cap nhat thong tin moi";
    console.log("message:::", message);
    channel.sendToQueue(queueResult.queue, Buffer.from(message), {
      expiration: "10000",
    });

    setTimeout(() => {
      connection.close();
      process.exit(0);
    }, 500);
  } catch (error) {
    console.log("err in runnProducer::", error);
  }
};

runProducer()
  .then((rs) => console.log(rs))
  .catch(console.error);
