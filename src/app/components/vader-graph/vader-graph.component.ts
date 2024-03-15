import {NgIf} from "@angular/common";
import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import Chart from 'chart.js/auto';
import { NrcLexEntry } from '../../types/nrclex-entry';

@Component({
  selector: 'app-vader-graph',
  standalone: true,
  imports: [NgIf],
  templateUrl: './vader-graph.component.html',
  styleUrls: ['./vader-graph.component.scss']
})
export class VaderGraphComponent implements AfterViewInit {
  @ViewChild('vaderCompoundChartCanvas') canvas: ElementRef<HTMLCanvasElement> | undefined;

  _entries: NrcLexEntry[] = [];
  vaderCompoundChart: Chart | undefined;

  @Input() set entries(value: NrcLexEntry[]) {

    this._entries = value;
    this.renderVaderCompoundChart();
  }

  ngAfterViewInit(): void {
    if (this._entries && this._entries.length > 0) {
      this.renderVaderCompoundChart();
    }
    window.addEventListener('resize', this.resizeChart);
  }

  ngOnDestroy(): void {
    window.removeEventListener('resize', this.resizeChart);
  }

  private renderVaderCompoundChart(): void {

    if (!this.canvas) return;

    const ctx = this.canvas.nativeElement.getContext('2d');

    if (!ctx) {
      console.error("Could not get canvas context for VADER Compound chart");
      return;
    }

    // Prepare the labels and data for the chart
    const labels = this._entries.map(entry => "");
    const data = this._entries.map(entry => entry.vader_compound);

    // Create gradient for the fill
    const gradient = ctx.createLinearGradient(0, 0, 0, ctx.canvas.height);
    gradient.addColorStop(.4, 'rgba(132,203,105,0.7)'); // Lighter green at the top
    gradient.addColorStop(.7, 'rgba(241,162,162,0.56)'); // Darker green at the bottom


    this.vaderCompoundChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'Daily Mood Pattern',
          data: data,
          fill: true,
          backgroundColor: gradient, // Use the gradient here
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.3
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: false,
            suggestedMin: Math.min(...data) - 0.5, // Provide padding below the minimum value
            suggestedMax: Math.max(...data) + 0.5, // Provide padding above the maximum value
          }
        }
      }
    });
  }

  private resizeChart = (): void => {
    if (this.vaderCompoundChart) {
      this.vaderCompoundChart.resize();
    }
  }
}
