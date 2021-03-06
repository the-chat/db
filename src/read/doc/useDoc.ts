import { DocumentSnapshot, Firestore } from "@firebase/firestore"
import { useDocument as useFirebaseDocument } from "react-firebase-hooks/firestore"
import { Options } from "react-firebase-hooks/firestore/dist/firestore/types"
import { RDFH, Obj } from "../../types"
import { useDocBase } from "./base"

export const useDoc = <T extends Obj>(
  db: Firestore,
  path: string,
  opts: Options
) =>
  useDocBase<DocumentSnapshot | undefined, Options>(
    db,
    useFirebaseDocument,
    path,
    opts
  ) as RDFH<DocumentSnapshot<T> | undefined>
