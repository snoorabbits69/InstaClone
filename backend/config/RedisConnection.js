import { createClient } from "redis";
let client=createClient({
    socket:{
        reconnectStrategy:(retries)=>{
            if(retries>=4){
                return new Error('Max reconnect attempts reached');
            }
            return Math.min(retries*1000,3000)
        }
    }
});
async function redisConnect(){
    try{
       let data= await client.connect();
       console.log("connected to redis")

    }
    catch(e){
        console.log("failed to connect to redis")
    }
}
client.on('error', (err) => {
    console.log('Redis client error:');
  });
  
  client.on('end', () => {
    console.log('Redis client disconnected');
  });
export {client,redisConnect};