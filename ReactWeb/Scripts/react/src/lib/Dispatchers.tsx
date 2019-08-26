
export type Dispatchers<T> = {

    [D in keyof T]: (...args: any[]) => any;
};
