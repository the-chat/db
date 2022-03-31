import {
  collection,
  Query,
  QuerySnapshot,
  getDocs,
  Firestore,
} from "@firebase/firestore"
import { Obj } from "../../../types"

export const readColOnce = <T extends Obj>(
  db: Firestore,
  pathOrQuery: string | Query
) =>
  getDocs(
    typeof pathOrQuery == "string" ? collection(db, pathOrQuery) : pathOrQuery
  ) as Promise<QuerySnapshot<T>>
