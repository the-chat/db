import { collection, Firestore, Query } from "firebase/firestore"
import { CFH } from "../../types"

const useCollectionBase = <T, Opts>(
  db: Firestore,
  fn: CFH<T, Opts>,
  pathOrQuery: string | Query,
  opts?: Opts
) =>
  fn(
    pathOrQuery instanceof Query ? pathOrQuery : collection(db, pathOrQuery),
    opts
  )

export default useCollectionBase
