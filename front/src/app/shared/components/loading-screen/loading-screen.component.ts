import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { SpinnerComponent } from 'src/app/shared/components/spinner/spinner.component';

@Component({
    selector: 'app-loading-screen',
    standalone: true,
    imports: [SpinnerComponent],
    templateUrl: './loading-screen.component.html',
    styleUrl: './loading-screen.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.ShadowDom,
})
export class LoadingScreenComponent {
    @Input({ required: true })
    public show!: boolean;
}
