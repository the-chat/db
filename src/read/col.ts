import {
  DocumentData,
  FirestoreError,
  collection,
  QuerySnapshot,
  CollectionReference,
  query,
  Query,
  getDocs,
  Firestore,
} from "@firebase/firestore"
import {
  useCollection as useFirebaseCollection,
  useCollectionData as useFirebaseCollectionData,
  useCollectionDataOnce as useFirebaseCollectionDataOnce,
  useCollectionOnce as useFirebaseCollectionOnce,
} from "react-firebase-hooks/firestore"
import {Data} from "react-firebase-hooks/firestore/dist/firestore/types"
import {Fn, Source} from "../types"

// collection functions first type argument is type of element of array, not of array

// todo?: learn?: how all this types work

const useCollectionBase = <T>(
  db: Firestore,
  fn: Fn<DocumentData, Query | CollectionReference>,
  pathOrQuery: string | Query,
  sourceOrincludeMetadataChanges?: boolean | Source
) => {
  return fn(
    // todo
    pathOrQuery instanceof Query
      ? query(pathOrQuery)
      : collection(db, pathOrQuery),

    sourceOrincludeMetadataChanges
      ? typeof sourceOrincludeMetadataChanges == "string"
        ? {getOptions: {source: sourceOrincludeMetadataChanges}}
        : {
            snapshotListenOptions: {
              includeMetadataChanges: sourceOrincludeMetadataChanges,
            },
          }
      : {}
  ) as ReturnType<Fn<T, Query | CollectionReference>>
}

export const useCollection = <T>(
  db: Firestore,
  pathOrQuery: string | Query,
  includeMetadataChanges?: boolean
) =>
  useCollectionBase<QuerySnapshot<T>>(
    db,
    useFirebaseCollection,
    pathOrQuery,
    includeMetadataChanges
  )

export const useCollectionOnce = <T>(
  db: Firestore,
  pathOrQuery: string | Query,
  source?: Source
) =>
  useCollectionBase<QuerySnapshot<T>>(
    db,
    useFirebaseCollectionOnce,
    pathOrQuery,
    source
  )

export const useCollectionData = <T>(
  db: Firestore,
  pathOrQuery: string | Query,
  defV?: T[],
  includeMetadataChanges?: boolean
): [T[], boolean, FirestoreError] => {
  const [value, loading, error] = useCollectionBase<Data<T>[]>(
    db,
    useFirebaseCollectionData,
    pathOrQuery,
    includeMetadataChanges
  )

  return [value || defV, loading, error]
}

export const useCollectionDataOnce = <T>(
  db: Firestore,
  pathOrQuery: string | Query,
  defV?: T[],
  source?: Source
): [T[], boolean, FirestoreError] => {
  const [value, loading, error] = useCollectionBase<Data<T>[]>(
    db,
    useFirebaseCollectionDataOnce,
    pathOrQuery,
    source
  )

  return [value || defV, loading, error]
}

// todo defV to []

// v1: readColOnce
// v1: readColDataOnce
// todo: readCol
// todo: readColData

const getColData = ({docs}) => docs.map((doc) => doc.data())

export const readColOnce = <T>(db: Firestore, pathOrQuery: string | Query) =>
  getDocs(
    typeof pathOrQuery == "string" ? collection(db, pathOrQuery) : pathOrQuery
  ) as Promise<QuerySnapshot<T>>

export const readColDataOnce = async <T>(
  db: Firestore,
  pathOrQuery: string | Query,
  defV: T[] = [],
  catchFn = console.log
) => {
  const data = await readColOnce(db, pathOrQuery)
    .then(getColData)
    .catch(catchFn)
  return (data as T[]) || defV
}
