import arc from "@architect/functions";
import cuid from "cuid";

const skToId = (sk) => sk.replace(/^note#/, "");
const idToSk = (id) => `note#${id}`;

export async function getNote({ id, userId }) {
  const db = await arc.tables();

  const result = await db.note.get({ pk: userId, sk: idToSk(id) });

  if (result) {
    return {
      userId: result.pk,
      id: result.sk,
      title: result.title,
      body: result.body,
    };
  }
  return null;
}

export async function getNoteListItems({ userId }) {
  const db = await arc.tables();

  const result = await db.note.query({
    KeyConditionExpression: "pk = :pk",
    ExpressionAttributeValues: { ":pk": userId },
  });

  return result.Items.map((n) => ({
    title: n.title,
    id: skToId(n.sk),
  }));
}

export async function createNote({ body, title, userId }) {
  const db = await arc.tables();

  const result = await db.note.put({
    pk: userId,
    sk: idToSk(cuid()),
    title: title,
    body: body,
  });
  return {
    id: skToId(result.sk),
    userId: result.pk,
    title: result.title,
    body: result.body,
  };
}

export async function deleteNote({ id, userId }) {
  const db = await arc.tables();
  return db.note.delete({ pk: userId, sk: idToSk(id) });
}
