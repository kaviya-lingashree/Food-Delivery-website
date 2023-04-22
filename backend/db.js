const mongoose = require('mongoose');
const mongoURI = 'mongodb+srv://himanshirawat604:himanshirawat604@cluster0.xog2sdk.mongodb.net/fooddelivery?retryWrites=true&w=majority'
const mongoconnect = async()=>{
    await mongoose.connect(mongoURI,{useNewUrlParser : true },async(err,result)=>{
        if(err) console.log("--",err)
        else {
            console.log("connected successfully");
            const fetched_data = await mongoose.connection.db.collection("menu");
            fetched_data.find({}).toArray(async function(err,data){
                const foodCategory = await mongoose.connection.db.collection("category");
                foodCategory.find({}).toArray(function (err,catData){

                
                if(err) 
                    console.log(err);
                else 
                    global.menu = data;
                    global.category = catData;
                    // console.log(global.menu)
              })
            })
        }
    });
}

module.exports = mongoconnect;




