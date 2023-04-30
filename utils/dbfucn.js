// contains the fucntion to store data to mongoatlas

import clientPromise from "@/lib/mongo/mongocon";

export async function storeToDB(textData) {
  const client = await clientPromise;

  const db = client.db("webscrap");

  await db.collection("words").insertOne({ textData });
  //    res.json(scrapdata);
}
