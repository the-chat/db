import {
  FirestoreError,
  Query,
  CollectionReference,
  DocumentReference,
} from "@firebase/firestore"

// todo?: to types pkg
export type Obj = Record<string, unknown>
export type FH<Ret, Ref, Opts> = (
  ref: Ref,
  opts?: Opts
) => [Ret, boolean, FirestoreError | undefined] // Firebase Hook
export type CFH<Ret, Opts> = FH<Ret, Query | CollectionReference, Opts> // Collection Firebase Hook
export type RCFH<Ret> = ReturnType<CFH<Ret, never>> // Return of Collection Firebase Hook
export type DFH<Ret, Opts> = FH<Ret, DocumentReference | undefined, Opts> // Document Firebase Hook
export type RDFH<Ret> = ReturnType<DFH<Ret, never>> // Return Document Firebase Hook
