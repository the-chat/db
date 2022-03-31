import {
  doc,
  DocumentReference,
  DocumentSnapshot,
  Firestore,
  FirestoreError,
  onSnapshot,
  SnapshotListenOptions,
} from "firebase/firestore"

export const readCol = (
  db: Firestore,
  pathOrQuery: string | DocumentReference,
  options: SnapshotListenOptions,
  observers: {
    next?: (snapshot: DocumentSnapshot) => void
    error?: (error: FirestoreError) => void
    complete?: () => void
  }
) =>
  onSnapshot(
    typeof pathOrQuery == "string" ? doc(db, pathOrQuery) : pathOrQuery,
    options,
    observers
  )
