class Observable {
  constructor(subscribe) {
    this._subscribe = subscribe;
  }

  subscribe(observer) {
    return this._subscribe(observer);
  }

  static timeout(time) {
    let obs = null;
    const handle = setTimeout(() => {
      if (!obs) return;
      obs.next();
      obs.complete();
    }, time)
    return new Observable((observer) => {
      obs = observer;
      return { unsubscribe: () => clearTimeout(handle)  }
    })
  }

  map(projection) {
    return new Observable(observer => {
      return this.subscribe({
        next(v) { observer.next(projection(v)); },
        complete() { observer.complete(); },
        error(err) { observer.error(err); }
      })
    });
  }

  filter(fn) {
    return new Observable(observer => {
      return this.subscribe({
        next(v) { if(fn(v)) {observer.next(v);} },
        complete() { observer.complete(); },
        error(err) { observer.error(err); }
      })
    });
  }
}

const observer = {
  next(x)    { console.log("☕️ Time to drink " + x); },
  error(err) { console.log("❌ Oops " + err); },
  complete() { console.log("✅ Done"); }
};

const observable$ = Observable.timeout(3000)

observable$.subscribe(observer);
setTimeout(() => observable$.subscribe(observer), 4000)
// unsubscribe();
