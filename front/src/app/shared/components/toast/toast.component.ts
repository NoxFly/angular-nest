import { Component, ViewEncapsulation } from '@angular/core';

@Component({
    standalone: true,
    selector: 'app-toast',
    templateUrl: './toast.component.html',
    styleUrl: './toast.component.scss',
    imports: [],
    encapsulation: ViewEncapsulation.ShadowDom,
})
export class ToastComponent {

}
