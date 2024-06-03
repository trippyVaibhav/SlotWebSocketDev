import * as WebSocket from 'ws';
import { v4 as uuidv4 } from 'uuid'; // Import UUID v4
import { CheckResult } from './SlotResult';
import { gameSettings, playerData } from './Global';
import { messageId } from './Types';
import { GambleGame } from './GambleResults';
import { log } from 'node:console';
// Map to store WebSocket connections with their associated client IDs
const clients: Map<string, WebSocket> = new Map();

// Function to handle client connections
function handleConnection(ws: WebSocket) {
  let isAlive = true;

  // Generate a unique client ID
  const clientId = uuidv4();

  // Store the WebSocket connection with its associated client ID
  clients.set(clientId, ws);

  console.log(`Client connected: ${clientId}`);

  // Function to handle pong messages
  function heartbeat() {
    isAlive = true;
  }

  // Set up a ping interval for the client
  const pingInterval = setInterval(() => {
    if (isAlive === false) {
      // If the client did not respond to the last ping, consider it disconnected
      console.log(`Client ${clientId} not responding, terminating connection`);
      ws.terminate();
      clearInterval(pingInterval);
      // Remove the client from the map
      clients.delete(clientId);
    } else {
      isAlive = false;
      ws.ping();
    }
  }, 5000); // Ping every 5 seconds

  // Event listener for pong messages
  ws.on('pong', heartbeat);

  // Event listener for messages from the client
  ws.on('message', function incoming(message: any) {
    console.log(`Received message from ${clientId}: ${message.id}`);
    const messageData = JSON.parse(message);
    console.log(messageData?.Data?.GameID);
    console.log(messageData.Data);

    
    if(messageData.id==messageId.auth){
      gameSettings.initiate(messageData.Data.GameID,clientId)
    }


    if (messageData.id == messageId.spin && gameSettings.startGame) {
      gameSettings.currentBet = messageData.Data.CurrentBet;
      const result=new CheckResult(clientId);
      //  result.searchWinSymbols();
    }

    if(messageData.id==messageId.gamble){
      console.log("message data",messageData);
      if(!gameSettings.currentGamedata.gamble.isEnabled)
        return;
      
      if(playerData.currentWining>1){
        gameSettings.gamble.start=true;
      }else{
        gameSettings.gamble.start=false;
        
      }
      
      console.log("gamblestart", gameSettings.gamble.start);
      
      if(gameSettings.gamble.start){
        
        if(!gameSettings.gamble.game)
        gameSettings.gamble.game= new GambleGame(clientId,playerData.currentWining);

        if(!gameSettings.gamble.game.checkIfClientExist(clients))
          gameSettings.gamble.game= new GambleGame(clientId,playerData.currentWining);
        
        
        if(messageData?.collect){
          gameSettings.gamble.game.updateplayerBalance();
          gameSettings.gamble.game.reset();
          return;
        }

        
        // if(gameSettings.gamble.game.gambleCount<gameSettings.gamble.maxCount){
          gameSettings.gamble.game.generateData(playerData.currentWining);

        // }else{
        //     gameSettings.gamble.game.updateplayerBalance();
        //     gameSettings.gamble.game.reset();
        // }
        
        // gameSettings.gamble.currentCount++;
        console.log("player balance",playerData);
        

      }


    }

  });

  // Event listener for closing connection
  ws.on('close', function close() {
    console.log(`Client ${clientId} disconnected`);
    clearInterval(pingInterval);
    // Remove the client from the map
    clients.delete(clientId);
  });
}

// Assuming wss is your WebSocket server instance
const wss = new WebSocket.Server({ port: 3036
});

// Event listener for server connection
wss.on('connection', handleConnection);

export function sendMessageToClient(clientId: string, id: string, message: any) {

  const ws = clients.get(clientId);
  if (ws && ws.readyState === WebSocket.OPEN)
    ws.send(JSON.stringify({ id, message }));
  else
    console.log(`Client ${clientId} not found or not connected.`);

}