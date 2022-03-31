import { Firestore, Query, QuerySnapshot } from "firebase/firestore"
import { Options } from "react-firebase-hooks/firestore/dist/firestore/types"
import { RCFH, Obj } from "../../types"
import useCollectionBase from "./base"
import { useCollection as useFirebaseCollection } from "react-firebase-hooks/firestore"

export const useCollection = <T extends Obj>(
  db: Firestore,
  pathOrQuery: string | Query,
  opts?: Options
) =>
  useCollectionBase<QuerySnapshot | undefined, Options>(
    db,
    useFirebaseCollection,
    pathOrQuery,
    opts
  ) as RCFH<QuerySnapshot<T>>
