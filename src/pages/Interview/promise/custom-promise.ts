// 三个状态： PENDING FULLFILLED REJECTED

enum PromiseStatus {
  Pending = 'PENDING',
  Fulfilled = 'FULLFILLED',
  Rejected = 'REJECTED',
}
/**
 * 执行顺序
 * 1. 初始化 constructor:
 *
 */

class MyPromise<T> {
  private status: PromiseStatus = PromiseStatus.Pending;
  private value?: T;
  private reason?: any;
  private onFulfilledCallbacks: ((value: T) => void)[] = [];
  private onRejectedCallbacks: ((reason: any) => void)[] = [];
  constructor(
    executor: (
      resolve: (value: T) => void,
      reject: (reason?: any) => void,
    ) => void,
  ) {
    try {
      executor(this.resolve.bind(this), this.reject.bind(this));
    } catch (error: any) {
      this.reject(error);
    }
  }

  // resolve
  private resolve(value: T): void {
    // 如果是Pending状态
    if (this.status === PromiseStatus.Pending) {
      this.status = PromiseStatus.Fulfilled;
      this.value = value;
      // 执行then的回调函数
      this.onFulfilledCallbacks.forEach((callback) => callback(value));
    }
  }

  // reject
  private reject(reason: T): void {
    if (this.status === PromiseStatus.Pending) {
      this.status = PromiseStatus.Rejected;
      this.reason = reason;
      this.onRejectedCallbacks.forEach((callback) => callback(reason));
    }
  }

  // .then方法
  then<U>(
    onFulfilled: (value: T) => U,
    onRejected?: (reason: any) => U,
  ): MyPromise<U> {
    const newPromise = new MyPromise<U>((resolve, reject) => {
      // Fulfilled
      if (this.status === PromiseStatus.Fulfilled) {
        try {
          // 成功时回调
          const result = onFulfilled(this.value as T);
          // 第一个then处理成功，传递结果给下一个then
          this.resolveWithResult(result, resolve, reject);
        } catch (error) {
          reject(error);
        }
      }
      // rejected
      else if (this.status === PromiseStatus.Rejected) {
        if (onRejected) {
          try {
            const result = onRejected(this.reason);
            this.resolveWithResult(result, resolve, reject);
          } catch (error) {
            reject(error);
          }
        } else {
          reject(this.reason);
        }
      }
      // pending
      else if (this.status === PromiseStatus.Pending) {
        this.onFulfilledCallbacks.push((value: T) => {
          try {
            const result = onFulfilled(value);
            this.resolveWithResult(result, resolve, reject);
          } catch (error) {
            reject(error);
          }
        });

        if (onRejected) {
          this.onRejectedCallbacks.push((reason: any) => {
            try {
              const result = onRejected(reason);
              this.resolveWithResult(result, resolve, reject);
            } catch (error) {
              reject(error);
            }
          });
        }
      }
    });
    return newPromise;
  }

  // then(...).then(())
  private resolveWithResult<U>(
    result: U,
    resolve: (value: U) => void,
    reject: (reason?: any) => void,
  ) {
    if (result instanceof MyPromise) {
      result.then(
        (value: U) => resolve(value),
        (reason: any) => reject(reason),
      );
    } else {
      resolve(result);
    }
  }

  catch<U>(onRejected: (reason: any) => U): MyPromise<U> {
    return this.then(undefined, onRejected);
  }
}

export default MyPromise;
