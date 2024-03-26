const { MongoClient } = require("mongodb");
// MongoDB connection URI
const uri =
  "mongodb+srv://mongodbuser:xX6wVVwX0AUMqM1f@atlascluster.eta4d9h.mongodb.net/?retryWrites=true&w=majority&appName=AtlasCluster";

// Function to connect to MongoDB and create a record
module.exports.handler = async (event) => {
  // Extract data from the event

  // const data = JSON.parse(event.body);
  const { username, date, comment } = JSON.parse(event.body);

  // MongoDB Atlas connection options
  const clientOptions = { useNewUrlParser: true, useUnifiedTopology: true };

  // Create a new MongoClient
  const client = new MongoClient(uri, clientOptions);

  try {
    // Connect to the MongoDB cluster
    await client.connect();

    // Access the database and collection
    const db = client.db("user_comment");
    const collection = db.collection("comments");

    // Create a new record
    const record = {
      username: username,
      date: date,
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
