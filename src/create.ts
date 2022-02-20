import {get} from "@the-chat/firebase"
import {setDoc, collection, doc} from "firebase/firestore"
const {db} = get()

export const create = <T>(path: string, data: T) =>
  setDoc(path.split("/")[1] ? doc(db, path) : doc(collection(db, path)), data)
