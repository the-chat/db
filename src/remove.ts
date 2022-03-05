import { doc, deleteDoc, deleteField, Firestore } from "firebase/firestore"
import { update } from "./update"

// todo: catch
export const remove = (db: Firestore, path: string, ...fields: string[]) => {
  if (fields[0])
    return update(
      db,
      path,
      fields.reduce(
        (a, b) => ({
          ...a,
          [b]: deleteField(),
        }),
        {}
      )
    )

  return deleteDoc(doc(db, path))
}
