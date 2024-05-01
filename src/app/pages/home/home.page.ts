import { Component, OnInit } from '@angular/core';
import { UtilsService } from '@services/utils/utils.service';
import { trigger, state, style, animate, transition } from '@angular/animations';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  inputSearch: string = '';
  showSearchInput: boolean = false;

  constructor(
    private utilsService: UtilsService,
  ) {}

  ngOnInit(): void {
    console.debug('[ HomePage ]...')
  }

  onHandleShowSearchInput(): void {
    this.showSearchInput = !this.showSearchInput;
  }

  onHandleInputSearch(event: any) {
    const searchTerm: string = event.target.value;
    console.debug('\n');
    console.debug('Search term | searchTerm:', searchTerm);
    console.debug('Search term | this.inputSearch:', this.inputSearch);
  }
}
