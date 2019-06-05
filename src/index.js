function siri(callback) {
  callback.next(1);
  setTimeout(() => {
    callback.next(2);
    callback.complete();
  }, 3000);
}

const callback = {
  next(x)    { console.log("☕️ Time to drink " + x); },
  error(err) { console.log("❌ Oops " + err); },
  complete() { console.log("✅ Done"); }
};

siri(callback)
