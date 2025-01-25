const {createClient}=require('redis');
let client=createClient();
async function redisConnect(){
    try{
       let data= await client.connect();
       console.log("connected to redis")

    }
    catch(e){
        console.log(e)
    }
}

module.exports={client,redisConnect};