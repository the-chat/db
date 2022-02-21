import {setDoc, collection, doc, Firestore} from "firebase/firestore"

export const create = <T>(db: Firestore, path: string, data: T) =>
  setDoc(path.split("/")[1] ? doc(db, path) : doc(collection(db, path)), data)
