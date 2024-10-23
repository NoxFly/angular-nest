import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml, SafeResourceUrl, SafeScript, SafeStyle, SafeUrl } from '@angular/platform-browser';

// http://szumiato.pl/2017/03/23/angular-2-sanitizer-debounce/

@Pipe({
    name: 'sanitize',
    standalone: true,
})
export class SanitizePipe implements PipeTransform {

    constructor(private readonly sanitizer: DomSanitizer) {}

    /**
     * Sanitize the given value
     */
    transform(value: string, type: string): SafeHtml | SafeStyle | SafeScript | SafeUrl | SafeResourceUrl {
        switch(type) {
            case 'html':
                return this.sanitizer.bypassSecurityTrustHtml(value);
            case 'style':
                return this.sanitizer.bypassSecurityTrustStyle(value);
            case 'script':
                return this.sanitizer.bypassSecurityTrustScript(value);
            case 'url':
                return this.sanitizer.bypassSecurityTrustUrl(value);
            case 'resourceUrl':
                return this.sanitizer.bypassSecurityTrustResourceUrl(value);
            default:
                throw new Error(`Unable to bypass security for invalid type: ${type}`);
        }
    }

}
