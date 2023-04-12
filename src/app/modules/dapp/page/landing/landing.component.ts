import { ContractsService } from 'src/app/data/service/contracts.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent implements OnInit {
  constructor(private contractsService: ContractsService) { }

  ngOnInit(): void { }
}
