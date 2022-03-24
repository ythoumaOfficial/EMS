import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";

const collections: { expenses?: mongoDB.Collection } = {}

const connectToDatabase = async () => {
    dotenv.config();

    const client: mongoDB.MongoClient = new mongoDB.MongoClient(<string>process.env.DB_CONN_STRING);

    await client.connect();

    const db: mongoDB.Db = client.db(process.env.DB_NAME);

    const expensesCollection: mongoDB.Collection = db.collection(<string>process.env.EXPENSES_COLLECTION_NAME);

    collections.expenses = expensesCollection;

    // console.log(`Successfully connected to database: ${db.databaseName} and collection: ${expensesCollection.collectionName}`);
}


export { connectToDatabase, collections };
