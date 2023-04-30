const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = process.env.MONGO_URI;

//   "mongodb+srv://rajsatyam8532:raghav@cluster0.lf8oxew.mongodb.net/?retryWrites=true&w=majority";
if (!uri) throw new Error("No connection found");

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let clientPromise;

clientPromise = client.connect();

export default clientPromise;
