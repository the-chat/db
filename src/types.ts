import { FirestoreError } from "@firebase/firestore"
import {
  OnceOptions,
  Options,
} from "react-firebase-hooks/firestore/dist/firestore/types"

export type Source = OnceOptions["getOptions"]["source"]
export type Fn<T, Ref> = (
  ref: Ref,
  opts: Options | OnceOptions
) => [T, boolean, FirestoreError]
