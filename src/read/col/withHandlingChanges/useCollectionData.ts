import { Firestore, Query } from "firebase/firestore"
import {
  Data,
  DataOptions,
} from "react-firebase-hooks/firestore/dist/firestore/types"
import { RCFH, Obj } from "../../../types"
import useCollectionBase from "../base"
import { useCollectionData as useFirebaseCollectionData } from "react-firebase-hooks/firestore"

export const useCollectionData = <T extends Obj>(
  db: Firestore,
  pathOrQuery: string | Query,
  defV?: Data<T>[],
  opts?: DataOptions<T>
) => {
  const [value, loading, error] = useCollectionBase<
    Data[] | undefined,
    DataOptions<T>
  >(db, useFirebaseCollectionData, pathOrQuery, opts)

  return [value || defV, loading, error] as RCFH<Data<T>[]>
}
