import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FactFeedService } from '../../services/fact-feed-service.service';
import { Fact } from '../../types/fact';


@Component({
  selector: 'app-fact-feed',
  templateUrl: './fact-feed-list.component.html',
  styleUrls: ['./fact-feed-list.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class FactFeedListComponent implements OnInit {
  facts: Fact[] = [];
  error: string | null = null;

  constructor(private factFeedService: FactFeedService) { }

  ngOnInit(): void {
    this.loadFactFeed();
  }

  loadFactFeed(): void {
    this.factFeedService.getFactFeed().subscribe({
      next: (data) => {
        this.facts = data;
        this.error = null;
      },
      error: (err) => {
        this.error = err;
      }
    });
  }
}
