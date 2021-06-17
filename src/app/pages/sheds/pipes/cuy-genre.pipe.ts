import {Pipe, PipeTransform} from '@angular/core';
import {Population} from '../../../../api/graphql';

@Pipe({
    name: 'cuyGenre'
})
export class CuyGenrePipe implements PipeTransform {

    transform(value: Population[], genre: string): number {
        const populationGenre = value.find((item) => item.genre.toLowerCase() === genre.toLowerCase());
        return populationGenre ? populationGenre.quantity : 0
    }

}
