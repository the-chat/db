import { DocumentSnapshot, Firestore } from "@firebase/firestore"
import { useDocumentOnce as useFirebaseDocumentOnce } from "react-firebase-hooks/firestore"
import {
  Data,
  OnceOptions,
  Options,
} from "react-firebase-hooks/firestore/dist/firestore/types"
import { RDFH } from "../../types"
import { useDocBase } from "./base"

export const useDocOnce = <T>(db: Firestore, path: string, opts: OnceOptions) =>
  useDocBase<DocumentSnapshot | undefined, OnceOptions>(
    db,
    useFirebaseDocumentOnce,
    path,
    opts
  ) as RDFH<DocumentSnapshot<T>>