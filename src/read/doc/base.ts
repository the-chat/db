import { collection, doc, Firestore } from "firebase/firestore"
import { DFH } from "../../types"

export const useDocBase = <T, Opts>(
  db: Firestore,
  fn: DFH<T, Opts>,
  path: string,
  opts?: Opts
) => fn(doc(collection(db, path.split("/")[0]), path.split("/")[1]), opts)
