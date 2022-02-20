import {
  DocumentData,
  FirestoreError,
  collection,
  QuerySnapshot,
  CollectionReference,
  query,
  Query,
  getDocs,
} from "@firebase/firestore"
import {
  useCollection as useFirebaseCollection,
  useCollectionData as useFirebaseCollectionData,
  useCollectionDataOnce as useFirebaseCollectionDataOnce,
  useCollectionOnce as useFirebaseCollectionOnce,
} from "react-firebase-hooks/firestore"
import {Data} from "react-firebase-hooks/firestore/dist/firestore/types"
import {Fn, Source} from "../types"
import {get} from "@the-chat/firebase"
const {db} = get()

// collection functions first type argument is type of element of array, not of array

// todo?: learn?: how all this types work

const useCollectionBase = <T>(
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
  pathOrQuery: string | Query,
  includeMetadataChanges?: boolean
) =>
  useCollectionBase<QuerySnapshot<T>>(
    useFirebaseCollection,
    pathOrQuery,
    includeMetadataChanges
  )

export const useCollectionOnce = <T>(
  pathOrQuery: string | Query,
  source?: Source
) =>
  useCollectionBase<QuerySnapshot<T>>(
    useFirebaseCollectionOnce,
    pathOrQuery,
    source
  )

export const useCollectionData = <T>(
  pathOrQuery: string | Query,
  defV?: T[],
  includeMetadataChanges?: boolean
): [T[], boolean, FirestoreError] => {
  const [value, loading, error] = useCollectionBase<Data<T>[]>(
    useFirebaseCollectionData,
    pathOrQuery,
    includeMetadataChanges
  )

  return [value || defV, loading, error]
}

export const useCollectionDataOnce = <T>(
  pathOrQuery: string | Query,
  defV?: T[],
  source?: Source
): [T[], boolean, FirestoreError] => {
  const [value, loading, error] = useCollectionBase<Data<T>[]>(
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

export const readColOnce = <T>(pathOrQuery: string | Query) =>
  getDocs(
    typeof pathOrQuery == "string" ? collection(db, pathOrQuery) : pathOrQuery
  ) as Promise<QuerySnapshot<T>>

export const readColDataOnce = async <T>(
  pathOrQuery: string | Query,
  defV: T[] = [],
  catchFn = console.log
) => {
  const data = await readColOnce(pathOrQuery).then(getColData).catch(catchFn)
  return (data as T[]) || defV
}
