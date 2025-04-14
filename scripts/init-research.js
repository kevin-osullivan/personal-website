const { MongoClient } = require('mongodb');

async function main() {
  const uri = process.env.MONGODB_URI;
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const database = client.db('personal-website');
    const research = database.collection('research');

    // Drop the existing collection if it exists
    await research.drop().catch(() => console.log('Collection does not exist'));

    // Create the collection
    await database.createCollection('research');

    // Insert sample research data
    const sampleResearch = [
      {
        title: "Machine Learning in Healthcare",
        description: "Exploring the applications of machine learning in healthcare diagnostics and treatment planning.",
        technologies: ["Python", "TensorFlow", "Scikit-learn", "Pandas"],
        status: "ongoing",
        paperUrl: "https://example.com/paper1",
        githubUrl: "https://github.com/example/research1",
        imageUrl: "/research1.jpg",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "Blockchain for Supply Chain",
        description: "Investigating the use of blockchain technology to improve supply chain transparency and efficiency.",
        technologies: ["Solidity", "Ethereum", "Web3.js", "Node.js"],
        status: "published",
        paperUrl: "https://example.com/paper2",
        githubUrl: "https://github.com/example/research2",
        imageUrl: "/research2.jpg",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    await research.insertMany(sampleResearch);
    console.log('Research collection initialized with sample data');
  } catch (error) {
    console.error('Error initializing research collection:', error);
  } finally {
    await client.close();
  }
}

main(); 