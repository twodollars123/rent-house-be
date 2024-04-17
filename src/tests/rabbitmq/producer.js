const amqp = require("amqplib");
const message = "test 1: Vua moi cap nhat thong tin moi";
const runProducer = async () => {
  try {
    const connection = await amqp.connect("amqp://guest:12345@localhost");
    const channel = await connection.createChannel();
    const queueName = "test1";
    await channel.assertQueue(queueName, {
      durable: true,
    });
    //send message to consumer
    channel.sendToQueue(queueName, Buffer.from(message));
    console.log("message:::", message);
  } catch (error) {
    console.log("err in runnProducer::", error);
  }
};

runProducer().catch(console.error);
