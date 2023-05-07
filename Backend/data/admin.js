const { MongoClient, ObjectId } = require('mongodb');
const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);

// connect to the database
await client.connect();

// create collections for each entity
const managersCollection = client.db('student-worker-program').collection('managers');
const studentsCollection = client.db('student-worker-program').collection('students');

// define the schema for each collection
const managersSchema = {
  username: { type: 'string', required: true, unique: true },
  name: { type: 'string', required: true },
  email: { type: 'string', required: true },
};

const studentsSchema = {
  name: { type: 'string', required: true },
  collegeId: { type: 'string', required: true },
  email: { type: 'string', required: true },
  managerUsername: { type: 'string', required: true },
};

// create indexes to improve query performance
await studentsCollection.createIndex({ collegeId: 1 }, { unique: true });
await studentsCollection.createIndex({ managerUsername: 1 });

// create a sample manager document
const manager = {
  username: 'johndoe',
  name: 'John Doe',
  email: 'johndoe@example.com',
};

// insert the manager document
await managersCollection.insertOne(manager);

// create a sample student document with a reference to the manager's username
const student = {
  name: 'Jane Smith',
  collegeId: '12345',
  email: 'janesmith@example.com',
  managerUsername: 'johndoe',
};

// insert the student document
await studentsCollection.insertOne(student);

// close the database connection when done
await client.close();
