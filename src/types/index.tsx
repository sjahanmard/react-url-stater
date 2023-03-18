export type Callback<T> = (x: T) => T;
export type SetState<T> = (func: Callback<T>) => void;
export type InitialValue<T> = T extends Record<any, any> ? T : never;
export type ReturnUseURLState<T> = [T, SetState<T>, SetState<T>];
