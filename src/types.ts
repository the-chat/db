import { FirestoreError, Query, CollectionReference } from "@firebase/firestore"

// todo?: to types pkg
export type Obj = Record<string, unknown>
export type FH<Ret, Ref, Opts> = (
  ref: Ref,
  opts?: Opts
) => [Ret, boolean, FirestoreError | undefined] // Firebase Hook
export type CFH<Ret, Opts> = FH<Ret, Query | CollectionReference, Opts> // Collection Firebase Hook
export type RCFH<Ret> = ReturnType<CFH<Ret, never>> // Return of Collection Firebase Hook
