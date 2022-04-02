import { DocumentSnapshot, Firestore } from "@firebase/firestore"
import { useDocumentOnce as useFirebaseDocumentOnce } from "react-firebase-hooks/firestore"
import { OnceOptions } from "react-firebase-hooks/firestore/dist/firestore/types"
import { RDFH, Obj } from "../../types"
import { useDocBase } from "./base"

export const useDocOnce = <T extends Obj>(
  db: Firestore,
  path: string,
  opts: OnceOptions
) =>
  useDocBase<DocumentSnapshot | undefined, OnceOptions>(
    db,
    useFirebaseDocumentOnce,
    path,
    opts
  ) as RDFH<DocumentSnapshot<T> | undefined>
