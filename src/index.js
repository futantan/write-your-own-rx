class Observable {
  constructor(subscribe) {
    this._subscribe = subscribe;
  }

  subscribe(observer) {
    return this._subscribe(observer);
  }

  static timeout(time) {
    return new Observable((observer) => {
      const handle = setTimeout(() => {
        observer.next();
        observer.complete();
      }, time)
      return { unsubscribe: () => clearTimeout(handle)  }
    })
  }
}

const observer = {
  next(x)    { console.log("☕️ Time to drink " + x); },
  error(err) { console.log("❌ Oops " + err); },
  complete() { console.log("✅ Done"); }
};

const observable$ = Observable.timeout(3000)

const { unsubscribe } = observable$.subscribe(observer);
unsubscribe();
