import { Component, OnInit } from '@angular/core';
import { ShoppingService } from '../shopping.service';

@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.css']
})
export class ShoppingComponent implements OnInit {

  constructor(public shoppingService: ShoppingService) { }

  ngOnInit() {
  }

}
