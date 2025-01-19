import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { SpinnerComponent } from 'src/app/shared/components/spinner/spinner.component';

@Component({
    standalone: true,
    selector: 'app-loading-screen',
    templateUrl: './loading-screen.component.html',
    styleUrl: './loading-screen.component.scss',
    imports: [SpinnerComponent],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.ShadowDom,
})
export class LoadingScreenComponent {
    @Input({ required: true })
    public show!: boolean;
}
