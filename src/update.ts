import {doc, DocumentData, updateDoc} from "@firebase/firestore"
import {get} from "@the-chat/firebase"
const {db} = get()

export const update = <T extends DocumentData>(path: string, data: T) =>
  updateDoc(doc(db, path), data)
