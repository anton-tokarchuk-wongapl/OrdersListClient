import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {

  constructor() { }

  @Input() id: number;
  @Input() name: string;
  @Input() price: number;
  @Input() photoUrl: string;

  editMode = false;

  ngOnInit() {
  }
  
}
