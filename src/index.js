function siri(observer) {
  observer.next(1);
  setTimeout(() => {
    observer.next(2);
    observer.complete();
  }, 3000);
}

const observer = {
  next(x)    { console.log("☕️ Time to drink " + x); },
  error(err) { console.log("❌ Oops " + err); },
  complete() { console.log("✅ Done"); }
};

siri(observer)
