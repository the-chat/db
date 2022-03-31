import { Firestore, Query, QuerySnapshot } from "firebase/firestore"
import { useCollectionOnce as useFirebaseCollectionOnce } from "react-firebase-hooks/firestore"
import { OnceOptions } from "react-firebase-hooks/firestore/dist/firestore/types"
import { RCFH, Obj } from "../../types"
import useCollectionBase from "./base"

export const useCollectionOnce = <T extends Obj>(
  db: Firestore,
  pathOrQuery: string | Query,
  opts: OnceOptions
) =>
  useCollectionBase<QuerySnapshot | undefined, OnceOptions>(
    db,
    useFirebaseCollectionOnce,
    pathOrQuery,
    opts
  ) as RCFH<QuerySnapshot<T> | undefined>
