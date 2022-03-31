import { Firestore, Query } from "firebase/firestore"
import { useCollectionDataOnce as useFirebaseCollectionDataOnce } from "react-firebase-hooks/firestore"
import {
  OnceDataOptions,
  Data,
} from "react-firebase-hooks/firestore/dist/firestore/types"
import { RCFH, Obj } from "../../../types"
import useCollectionBase from "../base"

export const useCollectionDataOnce = <T extends Obj>(
  db: Firestore,
  pathOrQuery: string | Query,
  defV?: T[],
  opts?: OnceDataOptions<T>
) => {
  const [value, loading, error] = useCollectionBase<
    Data[] | undefined,
    OnceDataOptions<T>
  >(db, useFirebaseCollectionDataOnce, pathOrQuery, opts)

  return [value || defV, loading, error] as RCFH<Data<T>[]>
}
