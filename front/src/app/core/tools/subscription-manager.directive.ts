import { Directive, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

/**
 * Service qui permet de facilement écouter des observables
 * en arrêtant d'écouter une fois que l'on n'en a plus besoin.
 */
@Directive()
export class SubscriptionManager implements OnDestroy {
    protected readonly closedSubject = new Subject<void>();

    public get closed$() {
        return this.closedSubject.asObservable();
    }

    public get untilDestroyed() {
        return <U>(source: Observable<U>) => source.pipe(takeUntil<U>(this.closed$));
    }


    protected set watch$(observable: Observable<any>) {
        observable.pipe(this.untilDestroyed).subscribe();
    }

    ngOnDestroy(): void {
        this.closedSubject.next();
        this.closedSubject.complete();
    }
}
