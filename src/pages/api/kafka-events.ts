// import { NextApiRequest, NextApiResponse } from 'next';
// import { Kafka } from 'kafkajs';
// import { WebSocketServer, WebSocket } from 'ws';
// import { IncomingMessage } from 'http';

// const wss = new WebSocketServer({ noServer: true });

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method === 'GET') {
//     wss.handleUpgrade(req, req.socket, Buffer.alloc(0), (ws) => onSocketConnect(ws, req));
//   } else {
//     res.status(405).end(); // Method Not Allowed
//   }
// }

// function onSocketConnect(ws: WebSocket, req: IncomingMessage) {
//   const kafka = new Kafka({
//     clientId: 'music_generation_group',
//     brokers: ['localhost:9092'],
//     retry: {
//       initialRetryTime: 100,
//       retries: 8,
//     },
//   });

//   const consumer = kafka.consumer({
//     groupId: 'music_generation_group',
//     sessionTimeout: 30000,
//   });

//   consumer
//     .connect()
//     .then(() => {
//       console.log('Kafka consumer connected');
//       return consumer.subscribe({
//         topics: [
//           'generate_music_result',
//           'generate_song_name_result',
//           'generate_image_result',
//         ],
//       });
//     })
//     .then(() =>
//       consumer.run({
//         eachMessage: async ({ topic, message }) => {
//           if (!message.value) return;

//           const data = JSON.parse(message.value.toString());
//           const responseData = {
//             topic,
//             data: data.data || data,
//           };

//           console.log(`Message received on topic ${topic}:`, responseData);
//           ws.send(JSON.stringify(responseData));
//         },
//       })
//     )
//     .catch((error) => {
//       console.error('Kafka consumer error:', error);
//       ws.close();
//     });

//   ws.on('close', async () => {
//     console.log('WebSocket closed; disconnecting Kafka consumer...');
//     await consumer.disconnect();
//   });
// }

