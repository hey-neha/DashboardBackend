const mongoose = require("mongoose");
// const mongo_url =
//   "mongodb+srv://ny8866428:nWYMihJyskUNOVgh@cluster0.fza7t0y.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

//ny8866428
// nWYMihJyskUNOVgh
// mongodb+srv://ny8866428:<password>@cluster0.fza7t0y.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

// mongoose
//   .connect(mongo_url)
//   .then(() => {
//     console.log("MongoDB Conneted............");
//   })
//   .catch((err) => {
//     console.log("mongoDB Connection Error:", err);
//   });

  export const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${"mongodb+srv://ny8866428:nWYMihJyskUNOVgh@cluster0.fza7t0y.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"}/${dashboard}`
    );
    console.log(
      `\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log("MONGODB connection FAILED ", error);
    process.exit(1);
  }
};

// export default connectDB;
