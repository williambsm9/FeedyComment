const { MongoClient, ServerApiVersion } = require("mongodb");

exports.handler = async (event) => {
  // MongoDB connection URI stored in environment variable
  const uri = process.env.MONGODB_URI;
  // const uri =
  //   "mongodb+srv://mongodbuser:xX6wVVwX0AUMqM1f@atlascluster.eta4d9h.mongodb.net/?retryWrites=true&w=majority&appName=AtlasCluster";

  // MongoDB Atlas connection options
  const clientOptions = {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  };

  const client = new MongoClient(uri, clientOptions);
  try {
    // Connect to MongoDB
    await client.connect();

    // Access the database and collection
    const db = client.db(process.env.DATABASE_NAME);
    const collection = db.collection(process.env.COLLECTION_NAME);

    // Find all comments
    const comments = await collection.find({}).toArray();

    // Close the connection to MongoDB
    await client.close();

    // Return the retrieved comments
    return {
      statusCode: 200,
      body: JSON.stringify(comments),
    };
  } catch (error) {
    console.error("Error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Error retrieving comments",
      }),
    };
  }
};
