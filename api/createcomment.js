const { MongoClient, ServerApiVersion } = require("mongodb");

// MongoDB connection URI
const uri = process.env.MONGODB_URI;

// Function to connect to MongoDB and create a record
module.exports.handler = async (event) => {
  // Extract data from the event

  // const data = JSON.parse(event.body);
  const { username, comment } = JSON.parse(event.body);

  // MongoDB Atlas connection options
  const clientOptions = {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  };

  // Create a new MongoClient
  const client = new MongoClient(uri, clientOptions);

  try {
    // Connect to the MongoDB cluster
    await client.connect();

    // Access the database and collection
    const db = client.db(process.env.DATABASE_NAME);
    const collection = db.collection(process.env.COLLECTION_NAME);

    // Create a new record
    const record = {
      username: username,
      date: new Date().toLocaleString(),
      comment: comment,
    };

    // Insert the record into the collection
    const result = await collection.insertOne(record);

    // Log the result
    console.log(`Inserted record with ID: ${result.insertedId}`);

    // Return a success response
    return {
      statusCode: 200,
      body: JSON.stringify({ status: "Record created successfully", record }),
    };
  } catch (err) {
    // Log any errors
    console.error(err);

    // Return an error response
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "An error occurred while creating the record: " + err,
      }),
    };
  } finally {
    // Close the MongoDB connection
    await client.close();
  }
};
