import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

let docs = [];

function eventsHandler(request, response) {

  const headers = {
    'Content-Type': 'text/event-stream',
    'Connection': 'keep-alive',
    'Cache-Control': 'no-cache'
  };

  response.writeHead(200, headers);

  const data = `${JSON.stringify(docs)}`;

  response.write(data);

  const newDoc = {
    response
  };

  docs.push(newDoc);

  request.on('close', () => {
    console.log(`Connection closed`);
  });
}

app.get('/events', eventsHandler);

function sendEventNotification(newDocument) {
  docs.forEach(doc => doc.response?.write(`data: ${JSON.stringify(newDocument)}\n\n`))
}

async function addDocument(request, response) {
  const newDoc = request.body;
  docs.push(newDoc);
  response.json(newDoc);
  return sendEventNotification(newDoc)
}

app.post('/document', addDocument);


const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Documents Events service listening at http://localhost:${PORT}`)
})