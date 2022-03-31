import { Firestore } from "@firebase/firestore"
import { useDocumentDataOnce as useFirebaseDocumentDataOnce } from "react-firebase-hooks/firestore"
import {
  Data,
  OnceOptions,
} from "react-firebase-hooks/firestore/dist/firestore/types"
import { RDFH } from "../../types"
import { useDocBase } from "./base"

export const useDocDataOnce = <T>(
  db: Firestore,
  path: string,
  defV?: Data<T>,
  opts?: OnceOptions
) => {
  const [val, loading, error] = useDocBase<Data | undefined, OnceOptions>(
    db,
    useFirebaseDocumentDataOnce,
    path,
    opts
  )

  return [val || defV, loading, error] as RDFH<Data<T> | undefined>
}
