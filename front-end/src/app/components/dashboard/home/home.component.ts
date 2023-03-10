import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Card 1', cols: 1, rows: 1, img: '../../../assets/img/dogs-shiba-inu.png' },
          { title: 'Card 2', cols: 1, rows: 2, img: '../../../assets/img/online-webinars.png' },
          { title: 'Card 3', cols: 1, rows: 2, img: '../../../assets/img/online-education.png' },
          { title: 'Card 4', cols: 1, rows: 1, img: 'https://material.angular.io/assets/img/examples/shiba2.jpg' }
        ];
      }

      return [
        { title: 'Card 1', cols: 2, rows: 1, img: '../../../assets/img/dog-shiba-inu.png' },
        { title: 'Card 2', cols: 1, rows: 2, img: '../../../assets/img/online-webinars.png' },
        { title: 'Card 3', cols: 1, rows: 3, img: '../../../assets/img/online-education.png' },
        { title: 'Card 4', cols: 1, rows: 2, img: 'https://material.angular.io/assets/img/examples/shiba2.jpg' }
      ];
    })
  );

  constructor(private breakpointObserver: BreakpointObserver) {}
}
