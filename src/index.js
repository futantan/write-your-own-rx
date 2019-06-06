class Observable {
  constructor(subscribe) {
    this._subscribe = subscribe;
  }

  subscribe(observer) {
    this._subscribe(observer);
  }

  static timeout(time) {
    return new Observable((observer) => {
      setTimeout(() => {
        observer.next();
        observer.complete();
      }, time)
    })
  }
}

const observer = {
  next(x)    { console.log("☕️ Time to drink " + x); },
  error(err) { console.log("❌ Oops " + err); },
  complete() { console.log("✅ Done"); }
};

const observable$ = Observable.timeout(3000)

observable$.subscribe(observer);
