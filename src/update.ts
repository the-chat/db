import {doc, DocumentData, updateDoc} from "@firebase/firestore"
import {db} from "@the-chat/firebase"

export const update = <T extends DocumentData>(path: string, data: T) =>
  updateDoc(doc(db, path), data)
