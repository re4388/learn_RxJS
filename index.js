

// original way
// document.addEventListener("click", () => console.log("Clicked!"));


// import { fromEvent } from "rxjs";
// fromEvent(document, "click").subscribe(() => console.log("Clicked!"));



/////////////////////////////////////

/* // subject
import {
    Subject, from
} from 'rxjs';

const subject = new Subject();

// subject can attached multiple observers
subject.subscribe({
    next: (v) => console.log(`observerA: ${v}`)
});
subject.subscribe({
    next: (v) => console.log(`observerB: ${v}`)
});

// create a observer with from keyword
const observable = from([1, 2, 3]);

// Since a Subject is an Observer,
// this also means you may provide a Subject as the argument
// to the subscribe of any Observable
observable.subscribe(subject)


// With the approach above, we essentially just converted a unicast Observable
// execution to multicast, through the Subject. This demonstrates how Subjects are
// the only way of making any Observable execution be shared to multiple Observers.

*/


/////////////////////////////////////



// import {
//     from,
//     Subject
// } from 'rxjs';
// import {
//     multicast
// } from 'rxjs/operators';


// const source = from([1, 2, 3]);
// const subject = new Subject();
// const multicasted = source.pipe(multicast(subject));

// // These are, under the hood, `subject.subscribe({...})`:
// multicasted.subscribe({
//     next: (v) => console.log(`observerA: ${v}`)
// });
// multicasted.subscribe({
//     next: (v) => console.log(`observerB: ${v}`)
// });

// // This is, under the hood, `source.subscribe(subject)`:
// multicasted.connect();



/////////////////////////////////////




import {
    Observable,
    asyncScheduler
} from 'rxjs';
import {
    observeOn
} from 'rxjs/operators';

var observable = new Observable((proxyObserver) => {
    proxyObserver.next(1);
    proxyObserver.next(2);
    proxyObserver.next(3);
    proxyObserver.complete();
}).pipe(
    observeOn(asyncScheduler)
);

var finalObserver = {
    next(x) {
        console.log('got value ' + x)
    },
    error(err) {
        console.error('something wrong occurred: ' + err);
    },
    complete() {
        console.log('done');
    }
};

console.log('just before subscribe');
observable.subscribe(finalObserver);
console.log('just after subscribe');



/* The AsyncSubject:
only when the execution complete,the observable execution sent the
last value to its observers */


// import {
//     AsyncSubject
// } from 'rxjs';

// const asyncSubject = new AsyncSubject();

// asyncSubject.subscribe({
//     next: (v) => console.log(`observerA: ${v}`)
// });

// asyncSubject.next(1);
// asyncSubject.next(2);
// asyncSubject.next(3);
// asyncSubject.next(4);

// asyncSubject.subscribe({
//     next: (v) => console.log(`observerB: ${v}`)
// });

// asyncSubject.next(5);
// asyncSubject.complete();