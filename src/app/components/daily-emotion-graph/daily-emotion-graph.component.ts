import {NgIf} from "@angular/common";
import {Component, ElementRef, Input, ViewChild} from '@angular/core';
import {Chart} from "chart.js/auto";
import {NrcLexEntry} from "../../types/nrclex-entry";

@Component({
  selector: 'app-daily-emotion-graph',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './daily-emotion-graph.component.html',
  styleUrl: './daily-emotion-graph.component.scss'
})

export class DailyEmotionGraphComponent {
  @ViewChild('dailyEmotionChartCanvas') canvas: ElementRef<HTMLCanvasElement> | undefined;

  emotionChart: Chart | undefined;
  _dailyAverages: { averages: Record<string, number>; day: string }[] = [];

  @Input() set dailyAverages(value: {
    averages: Record<string, number>;
    day: string
  }[]) {

    this._dailyAverages = value;
    this.renderChart();
  }

  ngAfterViewInit(): void {
    if (this._dailyAverages && this._dailyAverages.length > 0) {
      this.renderChart();
    }
    window.addEventListener('resize', this.resizeChart);
  }


  private resizeChart = (): void => {
    if (this.emotionChart) {
      this.emotionChart.resize();
    }
  }

  borderColorPalette = [
    'rgb(75, 192, 192)', // green (joy)
    'rgb(255, 99, 132)', // red (anger)
    // 'rgb(201, 203, 207)', // grey (fear)
    'rgb(54, 162, 235)', // blue (sadness)
    // 'rgb(153, 102, 255)', // purple (trust)
  ];

  backgroundColorPalette = [
    'rgb(75, 192, 192)', // green (joy)
    'rgb(255, 99, 132)', // red (anger)
    // 'rgb(201, 203, 207)', // grey (fear)
    'rgb(54, 162, 235)', // blue (sadness)
    'rgb(153, 102, 255)', // purple (trust)
  ];

  includedEmotions: (keyof NrcLexEntry)[] = [
    'joy', 'anger', 'sadness',
  ];

  renderChart(): void {
    if (!this.canvas) return;

    const ctx = this.canvas.nativeElement.getContext('2d');
    if (!ctx) {
      console.error("Could not get emotion chart canvas context");
      return;
    }

    // Extract the labels for the chart from the day field
    const chartLabels = this._dailyAverages.map(entry => entry.day);

    // Initialize an array to hold the datasets for each emotion
    const datasets = this.includedEmotions.map((emotion, index) => {
      // For each emotion, extract the average value from each day's averages
      const data = this._dailyAverages.map(entry => entry.averages[emotion]);

      // Use the borderColorPalette and backgroundColorPalette for the dataset's colors
      const borderColor = this.borderColorPalette[index % this.borderColorPalette.length];
      const backgroundColor = this.backgroundColorPalette[index % this.backgroundColorPalette.length];

      return {
        label: emotion.charAt(0).toUpperCase() + emotion.slice(1), // Capitalize the first letter of the emotion for the label
        data: data,
        borderColor: borderColor,
        backgroundColor: backgroundColor,
        borderWidth: 2,
        tension: .4
      };
    });

    // Range the upper bound of the data set to create a buffer in the chart
    const maxValue = Math.max(...datasets.map(dataset => Math.max(...dataset.data)));
    // Add a padding factor
    const padding = maxValue * 0.1;

    // Now, create the chart with the labels and datasets
    this.emotionChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: chartLabels,
        datasets: datasets
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            suggestedMax: maxValue + padding
          }
        }
      }
    });
  }
}
