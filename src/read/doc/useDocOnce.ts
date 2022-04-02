import { Firestore } from "@firebase/firestore"
import { useDocumentData as useFirebaseDocumentData } from "react-firebase-hooks/firestore"
import {
  Data,
  Options,
} from "react-firebase-hooks/firestore/dist/firestore/types"
import { RDFH, Obj } from "../../types"
import { useDocBase } from "./base"

export const useDocData = <T extends Obj>(
  db: Firestore,
  path: string,
  defV?: T,
  opts?: Options
) => {
  const [val, loading, error] = useDocBase<Data | undefined, Options>(
    db,
    useFirebaseDocumentData,
    path,
    opts
  )

  return [val || defV, loading, error] as RDFH<Data<T> | undefined>
}
