import { doc, DocumentData, updateDoc, Firestore } from "@firebase/firestore"

export const update = <T extends DocumentData>(
  db: Firestore,
  path: string,
  data: T
) => updateDoc(doc(db, path), data)
