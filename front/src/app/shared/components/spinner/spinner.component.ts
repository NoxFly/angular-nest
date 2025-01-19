import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
    standalone: true,
    selector: 'app-spinner',
    templateUrl: './spinner.component.html',
    styleUrl: './spinner.component.scss',
    imports: [],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.ShadowDom,
})
export class SpinnerComponent {

}
