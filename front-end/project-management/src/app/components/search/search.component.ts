import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DishService } from 'src/app/services/dish.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit{
  
  searchTerm: string | null = '';

  constructor(private route: ActivatedRoute,
              private router: Router,
              ) { }

  ngOnInit(): void {
    const keyword = this.route.snapshot.paramMap.get('keyword');
    
    this.searchTerm = keyword;
  }  

  doSearch() {
    if (this.searchTerm){
    this.router.navigateByUrl(`/search/${this.searchTerm}`);
    console.log(this.searchTerm);
    }
  }



  clear() {
    this.searchTerm = null;
    this.router.navigateByUrl(`/menu`);
  }

}


