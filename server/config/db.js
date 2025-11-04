import mongoose  from 'mongoose'
const connectDb = async()=>{
         try{
                  await mongoose.connect(process.env.MONGO_URL);
                  console.log("MongoDb connected");

         }
         catch (err) {
                  console.error("mongo db is not connected", err.message);
                  process.exit(1);

         }

}
export default connectDb;