// const mongoose = require("mongoose");
// const mongo_url =
//   "mongodb+srv://ny8866428:JtLwxZI46RPDfPCU@cluster0.hwwpu1x.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

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

/*   const connectDB = async () => {
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
 */

// JtLwxZI46RPDfPCU------password
// mongodb+srv://<username>:<password>@cluster0.hwwpu1x.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

// const mongoose = require("mongoose");

// const mongo_url =
//   "mongodb+srv://ny8866428:JtLwxZI46RPDfPCU@cluster0.hwwpu1x.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// const connectDB = async () => {
//   try {
//     const connectionInstance = await mongoose.connect(mongo_url, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     console.log(
//       `\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`
//     );
//   } catch (error) {
//     console.log("MONGODB connection FAILED ", error);
//     process.exit(1);
//   }
// };

// module.exports = connectDB;

// const { MongoClient } = require('mongodb');

const { MongoClient } = require("mongodb");

const uri = "your_mongodb_connection_string_here";
const client = new MongoClient(
  "mongodb+srv://ny8866428:JtLwxZI46RPDfPCU@cluster0.hwwpu1x.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
);

async function connect() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("MONGODB connection FAILED", err);
  }
}

connect();
