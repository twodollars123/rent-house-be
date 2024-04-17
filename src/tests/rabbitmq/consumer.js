const amqp = require("amqplib");
const runConsumer = async () => {
  try {
    const connection = await amqp.connect("amqp://guest:12345@localhost");
    const channel = await connection.createChannel();
    const queueName = "test1";
    await channel.assertQueue(queueName, {
      durable: true,
    });
    //received message from producer
    channel.consume(
      queueName,
      (message) => {
        console.log(`received ${message.content.toString()}`);
      },
      {
        noAck: true,
      }
    );
  } catch (error) {
    console.log("err in runnProducer::", error);
  }
};

runConsumer().catch(console.error);
