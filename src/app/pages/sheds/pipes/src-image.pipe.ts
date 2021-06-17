import {Pipe, PipeTransform} from '@angular/core';
import {environment} from '../../../../environments/environment';

@Pipe({
    name: 'srcImage'
})
export class SrcImagePipe implements PipeTransform {

    transform(relativePath: string, ...args: unknown[]): string {
        return `${ environment.API_ENDPOINT_ROOT }${ relativePath }`
    }

}
