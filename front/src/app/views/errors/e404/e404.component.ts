import { Component, ChangeDetectionStrategy } from "@angular/core";
import { RouterLink } from "@angular/router";

@Component({
    standalone: true,
    selector: 'app-e404',
    templateUrl: './e404.component.html',
    styleUrls: ['./e404.component.scss'],
    imports: [RouterLink],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class E404Component {
    constructor() {}
}
