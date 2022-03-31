import { create as _create } from "./create"
import {
  useCollection as _useCollection,
  useCollectionData as _useCollectionData,
  useCollectionDataOnce as _useCollectionDataOnce,
  useCollectionOnce as _useCollectionOnce,
} from "./read"
import {
  useDoc as _useDoc,
  useDocData as _useDocData,
  useDocDataOnce as _useDocDataOnce,
  useDocOnce as _useDocOnce,
} from "./read/doc"
import { update as _update } from "./update"
import { remove as _remove } from "./remove"
import {
  DocumentData,
  DocumentSnapshot,
  Firestore,
  FirestoreError,
  Query,
  QuerySnapshot,
} from "firebase/firestore"
import { Obj } from "./types"
import {
  Data,
  DataOptions,
  OnceDataOptions,
  OnceOptions,
  Options,
} from "react-firebase-hooks/firestore/dist/firestore/types"

const getDb = (db: Firestore) => {
  const create: <T>(path: string, data: T) => Promise<void> = (path, data) =>
    _create(db, path, data)

  const update: <T extends DocumentData>(
    path: string,
    data: T
  ) => Promise<void> = (path, data) => _update(db, path, data)

  const remove: (path: string, ...fields: string[]) => Promise<void> = (
    path,
    ...fields
  ) => _remove(db, path, ...fields)

  const useCollection: <T extends Obj>(
    pathOrQuery: string | Query,
    opts?: Options | undefined
  ) => [QuerySnapshot<T>, boolean, FirestoreError | undefined] = (
    pathOrQuery,
    includeMetadataChanges
  ) => _useCollection(db, pathOrQuery, includeMetadataChanges)
  const useCollectionOnce: <T extends Obj>(
    pathOrQuery: string | Query,
    opts: OnceOptions
  ) => [
    QuerySnapshot<T>,
    boolean,
    import("@firebase/firestore").FirestoreError | undefined
  ] = (pathOrQuery, source) => _useCollectionOnce(db, pathOrQuery, source)
  const useCollectionData: <T extends Obj>(
    pathOrQuery: string | Query,
    defV?: Data<T, "", "">[] | undefined,
    opts?: DataOptions<T> | undefined
  ) => [
    Data<T, "", "">[],
    boolean,
    import("@firebase/firestore").FirestoreError | undefined
  ] = (pathOrQuery, defV, includeMetadataChanges) =>
    _useCollectionData(db, pathOrQuery, defV, includeMetadataChanges)
  const useCollectionDataOnce: <T extends Obj>(
    pathOrQuery: string | Query,
    defV?: T[] | undefined,
    opts?: OnceDataOptions<T> | undefined
  ) => [
    Data<T, "", "">[],
    boolean,
    import("@firebase/firestore").FirestoreError | undefined
  ] = (pathOrQuery, defV, source) =>
    _useCollectionDataOnce(db, pathOrQuery, defV, source)

  const useDoc: <T>(
    path: string,
    opts: Options
  ) => [
    DocumentSnapshot<T>,
    boolean,
    import("@firebase/firestore").FirestoreError | undefined
  ] = (path, includeMetadataChanges) =>
    _useDoc(db, path, includeMetadataChanges)
  const useDocData: <T>(
    path: string,
    defV?: T | undefined,
    opts?: Options | undefined
  ) => [Data<T, "", ""> | undefined, boolean, FirestoreError | undefined] = (
    path,
    defV,
    includeMetadataChanges
  ) => _useDocData(db, path, defV, includeMetadataChanges)
  const useDocOnce: <T>(
    path: string,
    opts: OnceOptions
  ) => [
    DocumentSnapshot<T>,
    boolean,
    import("@firebase/firestore").FirestoreError | undefined
  ] = (path, source) => _useDocOnce(db, path, source)
  const useDocDataOnce: <T>(
    path: string,
    defV?: Data<T, "", ""> | undefined,
    opts?: OnceOptions | undefined
  ) => [
    Data<T, "", ""> | undefined,
    boolean,
    import("@firebase/firestore").FirestoreError | undefined
  ] = (path, defV, source) => _useDocDataOnce(db, path, defV, source)

  return {
    create,
    update,
    remove,

    useCollection,
    useCollectionData,
    useCollectionDataOnce,
    useCollectionOnce,

    useDoc,
    useDocData,
    useDocDataOnce,
    useDocOnce,
  }
}

export * from "./types"
export default getDb
