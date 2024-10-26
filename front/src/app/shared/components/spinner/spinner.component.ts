import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'app-spinner',
    standalone: true,
    imports: [],
    templateUrl: './spinner.component.html',
    styleUrl: './spinner.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.ShadowDom,
})
export class SpinnerComponent {

}
