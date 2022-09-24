const throw_fn = (err: unknown): never => { throw err }

export const None = void 0;
export type Option<T> = T | typeof None;

export const is_some = <T>(opt: Option<T>): opt is T => opt !== None;
export const is_some_and = <T>(opt: Option<T>, f: (x: T) => boolean): boolean => is_some(opt) ? f(opt) : false;
export const is_none = <T>(opt: Option<T>): opt is typeof None => opt === None;
export const expect = <T>(opt: Option<T>, err: unknown): T => is_some(opt) ? opt : throw_fn(err);
export const unwrap = <T>(opt: Option<T>): T => is_some(opt) ? opt : throw_fn(new TypeError("called option_utils.unwrap() on a None (undefined) value"));
export const unwrap_or = <T>(opt: Option<T>, def: T): T => is_some(opt) ? opt : def;
export const unwrap_or_else = <T>(opt: Option<T>, f: () => T): T => is_some(opt) ? opt : f();
export const unwrap_unchecked = <T>(opt: Option<T>): T => opt!;
export const map = <T, U>(opt: Option<T>, f: (x: T) => U): Option<U> => is_some(opt) ? f(opt) : None;
export const map2 = <T, U, V>(opt: Option<T>, optb: Option<U>, f: (x: T, y: U) => V): Option<V> =>
  (is_some(opt) && is_some(optb)) ? f(opt, optb) : None;
export const map_or = <T, U>(opt: Option<T>, def: U, f: (x: T) => U): U => is_some(opt) ? f(opt) : def;
export const map_or_else = <T, U>(opt: Option<T>, def: () => U, f: (x: T) => U): U => is_some(opt) ? f(opt) : def();
export const into_list = <T>(opt: Option<T>): T[] => is_some(opt) ? [opt] : [];
export const and = <T, U>(opt: Option<T>, optb: Option<U>): Option<U> => is_some(opt) ? optb : None;
export const and_then = <T, U>(opt: Option<T>, f: () => Option<U>): Option<U> => is_some(opt) ? f() : None;
export const filter = <T>(opt: Option<T>, pred: (x: T) => boolean): Option<T> => is_some(opt) ? (pred(opt) ? opt : None) : None;
export const or = <T>(opt: Option<T>, optb: Option<T>): Option<T> => is_some(opt) ? opt : optb;
export const or_else = <T>(opt: Option<T>, f: () => Option<T>): Option<T> => is_some(opt) ? opt : f();
export const xor = <T>(opt: Option<T>, optb: Option<T>): Option<T> => is_some(opt) ? (is_some(optb) ? None : opt) : (is_some(optb) ? optb : None);

export const from_bool_and = <T>(bool: boolean, x: T): Option<T> => bool ? x : None;
export const from_bool_and_then = <T>(bool: boolean, f: () => T): Option<T> => bool ? f() : None;

export const filter_none = <T>(opts: Option<T>[]): T[] => opts.filter(is_some) as T[];

export const from_str = (x: string): Option<string> => x === "" ? None : x;
export const from_num = (x: number): Option<number> => x === 0 ? None : x;
export const from_bool = (x: boolean): Option<true> => x ? x : None;
export const into_str = (opt: Option<string>): string => is_some(opt) ? opt : "";
export const into_num = (opt: Option<number>): number => is_some(opt) ? opt : 0;
export const into_bool = (opt: Option<boolean>): boolean => is_some(opt) ? opt : false;
