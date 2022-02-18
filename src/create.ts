import {db} from "@the-chat/firebase"
import {setDoc, collection, doc} from "firebase/firestore"

export const create = <T>(path: string, data: T) =>
  setDoc(path.split("/")[1] ? doc(db, path) : doc(collection(db, path)), data)
