import { create as _create } from "./create"
import {
  readColDataOnce as _readColDataOnce,
  readColOnce as _readColOnce,
  useCollection as _useCollection,
  useCollectionData as _useCollectionData,
  useCollectionDataOnce as _useCollectionDataOnce,
  useCollectionOnce as _useCollectionOnce,
} from "./read/col"
import {
  useDoc as _useDoc,
  useDocData as _useDocData,
  useDocDataOnce as _useDocDataOnce,
  useDocOnce as _useDocOnce,
  readDocOnce as _readDocOnce,
  readDocDataOnce as _readDocDataOnce,
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
import { Source } from "./types"

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

  const useCollection: <T>(
    pathOrQuery: string | Query,
    includeMetadataChanges?: boolean
  ) => [QuerySnapshot<T>, boolean, FirestoreError] = (
    pathOrQuery,
    includeMetadataChanges
  ) => _useCollection(db, pathOrQuery, includeMetadataChanges)
  const useCollectionOnce: <T>(
    pathOrQuery: string | Query,
    source?: Source
  ) => [QuerySnapshot<T>, boolean, FirestoreError] = (pathOrQuery, source) =>
    _useCollectionOnce(db, pathOrQuery, source)
  const useCollectionData: <T>(
    pathOrQuery: string | Query,
    defV?: T[],
    includeMetadataChanges?: boolean
  ) => [T[], boolean, FirestoreError] = (
    pathOrQuery,
    defV,
    includeMetadataChanges
  ) => _useCollectionData(db, pathOrQuery, defV, includeMetadataChanges)
  const useCollectionDataOnce: <T>(
    pathOrQuery: string | Query,
    defV?: T[],
    source?: Source
  ) => [T[], boolean, FirestoreError] = (pathOrQuery, defV, source) =>
    _useCollectionDataOnce(db, pathOrQuery, defV, source)
  const readColOnce: <T>(
    pathOrQuery: string | Query
  ) => Promise<QuerySnapshot<T>> = (pathOrQuery) =>
    _readColOnce(db, pathOrQuery)
  const readColDataOnce: <T>(
    pathOrQuery: string | Query,
    defV?: T[],
    catchFn?: {
      (...data: any[]): void
      (message?: any, ...optionalParams: any[]): void
    }
  ) => Promise<T[]> = (pathOrQuery, defV, catchFn) =>
    _readColDataOnce(db, pathOrQuery, defV, catchFn)

  const useDoc: <T>(
    path: string,
    includeMetadataChanges?: boolean
  ) => [DocumentSnapshot<T>, boolean, FirestoreError] = (
    path,
    includeMetadataChanges
  ) => _useDoc(db, path, includeMetadataChanges)
  const useDocOnce: <T>(
    path: string,
    source?: Source
  ) => [DocumentSnapshot<T>, boolean, FirestoreError] = (path, source) =>
    _useDocOnce(db, path, source)
  const useDocData: <T>(
    path: string,
    defV?: T,
    includeMetadataChanges?: boolean
  ) => [T, boolean, FirestoreError] = (path, defV, includeMetadataChanges) =>
    _useDocData(db, path, defV, includeMetadataChanges)
  const useDocDataOnce: <T>(
    path: string,
    defV?: T,
    source?: Source
  ) => [T, boolean, FirestoreError] = (path, defV, source) =>
    _useDocDataOnce(db, path, defV, source)
  const readDocOnce: <T>(path: string) => Promise<DocumentSnapshot<T>> = (
    path
  ) => _readDocOnce(db, path)
  const readDocDataOnce: <T>(path: string) => [T, boolean, FirestoreError] = (
    path
  ) => _readDocDataOnce(db, path)

  return {
    create,
    update,
    remove,
    useCollection,
    useCollectionData,
    useCollectionDataOnce,
    useCollectionOnce,
    readColOnce,
    readColDataOnce,
    useDoc,
    useDocData,
    useDocDataOnce,
    useDocOnce,
    readDocDataOnce,
    readDocOnce,
  }
}

export * from "./types"
export default getDb
