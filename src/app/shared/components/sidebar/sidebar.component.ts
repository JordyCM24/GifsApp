import { Component } from '@angular/core';
import { GifsService } from '../../../gifs/services/gifs.service';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {

  constructor(private _gifService: GifsService){}

  get tagsHistory(){
    return this._gifService.tagHistory;
  }

  //recivo el tag que se selecciono del *ngFor HTML que ha sido recorrido
  searchTag(tag: string): void {
    this._gifService.searchTag(tag);
  }

}
