export type ActionEmitterDto<K extends string, T> = { action: K; payload: T };

export type ActionEmitterMediator<A extends ActionEmitterDto<any, any>> =
  Record<A['action'], (payload: A['payload']) => void>;
