class SiriFactory {
  constructor(subscribe) {
    this._subscribe = subscribe;
  }

  subscribe(observer) {
    this._subscribe(observer);
  }
}

const observer = {
  next(x)    { console.log("☕️ Time to drink " + x); },
  error(err) { console.log("❌ Oops " + err); },
  complete() { console.log("✅ Done"); }
};

const stupidSiri = new SiriFactory(observer => {
  observer.next(1);
  setTimeout(() => {
    observer.next(2);
    observer.complete();
  }, 3000);
});
stupidSiri.subscribe(observer);
