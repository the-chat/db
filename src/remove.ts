import {db} from "@the-chat/firebase"
import {doc, deleteDoc, deleteField} from "firebase/firestore"
import {update} from "./update"

// todo: catch
export const remove = (path: string, ...fields: string[]) => {
  if (fields[0])
    return update(
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
