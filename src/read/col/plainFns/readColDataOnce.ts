import { Query, Firestore } from "@firebase/firestore"
import { Obj } from "../../../types"
import { readColOnce } from "./readColOnce"

export const readColDataOnce = async <T extends Obj>(
  db: Firestore,
  pathOrQuery: string | Query,
  defV: T[] = [],
  catchFn: () => void = () => {}
) => {
  const data = await readColOnce<T>(db, pathOrQuery)
    .then(({ docs }) => docs.map((doc) => doc.data()))
    .catch(catchFn)

  return data || defV
}
