import mongoose from "mongoose";



// db connection
mongoose.set("strictQuery", false);

export  const connect = async () => {
  try {
    await mongoose.connect(process.env.mongo_url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("data base is connected");
  } catch (err) {
    console.log("data base is disconnected  there is an error");
  }
};