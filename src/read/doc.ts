import {
  doc,
  FirestoreError,
  DocumentSnapshot,
  DocumentReference,
  // onSnapshot,
  // Query,
  getDoc,
} from "@firebase/firestore"
import {
  useDocument as useFirebaseDocument,
  useDocumentData as useFirebaseDocumentData,
  useDocumentDataOnce as useFirebaseDocumentDataOnce,
  useDocumentOnce as useFirebaseDocumentOnce,
} from "react-firebase-hooks/firestore"
import {Data} from "react-firebase-hooks/firestore/dist/firestore/types"
import {Fn, Source} from "../types"
import {get} from "@the-chat/firebase"
const {db} = get()

const useDocBase = <T, R>(
  fn: Fn<R, DocumentReference<T>>,
  path: string,
  sourceOrIncludeMetadataChanges?: boolean | Source
) =>
  fn(
    doc(db, path) as DocumentReference<T>,
    sourceOrIncludeMetadataChanges
      ? typeof sourceOrIncludeMetadataChanges == "string"
        ? {getOptions: {source: sourceOrIncludeMetadataChanges}}
        : {
            snapshotListenOptions: {
              includeMetadataChanges: sourceOrIncludeMetadataChanges,
            },
          }
      : {}
  )

export const useDoc = <T>(path: string, includeMetadataChanges?: boolean) =>
  useDocBase<T, DocumentSnapshot<T>>(
    useFirebaseDocument,
    path,
    includeMetadataChanges
  )

export const useDocOnce = <T>(path: string, source?: Source) =>
  useDocBase<T, DocumentSnapshot<T>>(useFirebaseDocumentOnce, path, source)

export const useDocData = <T>(
  path: string,
  defV?: T,
  includeMetadataChanges?: boolean
): [T, boolean, FirestoreError] => {
  const [val, loading, error] = useDocBase<T, Data<T>>(
    useFirebaseDocumentData,
    path,
    includeMetadataChanges
  )

  return [val || defV, loading, error]
}

export const useDocDataOnce = <T>(
  path: string,
  defV?: T,
  source?: Source
): [T, boolean, FirestoreError] => {
  const [val, loading, error] = useDocBase<T, Data<T>>(
    useFirebaseDocumentDataOnce,
    path,
    source
  )

  return [val || defV, loading, error]
}

// todo: readDocDataOnce
// todo: readDocOnce
// todo: readDocData
// todo: readDoc

// todo?: catch arg type
export const readDocOnce = <T>(path: string) => {
  return getDoc(doc(db, path)) as Promise<DocumentSnapshot<T>>
}

// TODO
export const readDocDataOnce = <T>(
  path: string
): [T, boolean, FirestoreError] => {
  const ref: [T, boolean, FirestoreError] = [null, true, null]

  readDocOnce<T>(path)
    .then((doc) => (ref[0] = doc.data()))
    .catch((rej) => (ref[2] = rej))
    .finally(() => (ref[1] = false))

  return ref
}

// export const read = <T>(
//   pathOrQuery: string | Query<T>,
//   includeMetadataChanges?: boolean
// ) => {
//   return onSnapshot<T>(
//     pathOrQuery instanceof Query ? pathOrQuery : doc(db, path),
//     { includeMetadataChanges },
//     {}
//   )
// }
