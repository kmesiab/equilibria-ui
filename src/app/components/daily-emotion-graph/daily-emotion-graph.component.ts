import { NgIf } from "@angular/common";
import { Component, ElementRef, Input, ViewChild } from "@angular/core";
import { Chart } from "chart.js/auto";
import { NrcLexEntry } from "../../types/nrclex-entry";

@Component({
  selector: "app-daily-emotion-graph",
  standalone: true,
  imports: [NgIf],
  templateUrl: "./daily-emotion-graph.component.html",
  styleUrl: "./daily-emotion-graph.component.scss",
})
export class DailyEmotionGraphComponent {
  @ViewChild("dailyEmotionChartCanvas") canvas:
    | ElementRef<HTMLCanvasElement>
    | undefined;

  emotionChart: Chart<"doughnut", number[], string> | undefined;
  _dailyAverages: { averages: Record<string, number>; day: string }[] = [];

  @Input() set dailyAverages(
    value: {
      averages: Record<string, number>;
      day: string;
    }[]
  ) {
    this._dailyAverages = value;
    this.renderChart();
  }

  ngAfterViewInit(): void {
    if (this._dailyAverages && this._dailyAverages.length > 0) {
      this.renderChart();
    }
    window.addEventListener("resize", this.resizeChart);
  }

<<<<<<< Updated upstream
=======
  ngOnDestroy(): void {
    window.removeEventListener("resize", this.resizeChart);
  }


>>>>>>> Stashed changes
  private resizeChart = (): void => {
    if (this.emotionChart) {
      this.emotionChart.resize();
    }
  };

  borderColorPalette = [
    "rgb(255, 205, 86)", // yellow (joy)
    "rgb(255, 99, 132)", // red (anger)
    "rgb(54, 162, 235)", // blue (sadness)
    "rgb(255, 159, 64)", // orange (anticipation)
    "rgb(75, 192, 192)", // teal (disgust)
    "rgb(201, 203, 207)", // grey (fear)
    "rgb(153, 102, 255)", // purple (trust)
    "rgb(255, 205, 86)", // yellow (joy, repeated for the list coverage)
    "rgb(255, 99, 132)", // pink (negative, similar to anger but softer)
  ];

  backgroundColorPalette = [
    "rgba(255, 205, 86, 0.8)", // yellow (joy)
    "rgba(255, 99, 132, 0.5)", // red (anger)
    "rgba(54, 162, 235, 0.5)", // blue (sadness)
    "rgba(255, 159, 64, 0.2)", // orange (anticipation)
    "rgba(75, 192, 192, 0.2)", // teal (disgust)
    "rgba(201, 203, 207, 0.2)", // grey (fear)
    "rgba(153, 102, 255, 0.2)", // purple (trust)
    "rgba(255, 205, 86, 0.2)", // yellow (joy, repeated for the list coverage)
    "rgba(255, 99, 132, 0.2)", // pink (negative, similar to anger but softer)
  ];

  includedEmotions: (keyof NrcLexEntry)[] = ["joy", "anger", "sadness"];

  renderChart(): void {
    if (!this.canvas) return;

    const ctx = this.canvas.nativeElement.getContext('2d');
    if (!ctx) {
      console.error("Could not get emotion chart canvas context");
      return;
    }

    const emotionAverages = this.calculateAggregateForEmotion();

    // Ensure that labels match the emotion names properly
    const chartLabels = Object.keys(emotionAverages).map(emotion =>
      emotion.charAt(0).toUpperCase() + emotion.slice(1) // Capitalize the first letter
    );

    // Data for the chart, mapped directly from the emotion averages
    const data = Object.values(emotionAverages);

    // Colors for each segment of the doughnut chart
    const backgroundColors = chartLabels.map((_, index) =>
      this.backgroundColorPalette[index % this.backgroundColorPalette.length]
    );

    // If the chart instance already exists, destroy it before creating a new one
    if (this.emotionChart) {
      this.emotionChart.destroy();
    }

    this.emotionChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: chartLabels,
        datasets: [{
          label: 'Emotions',
          data: data,
          backgroundColor: backgroundColors,
          borderWidth: 2,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Emotion Distribution'
          }
        }
      }
    });
  }


  calculateAggregateForEmotion(): { [emotion: string]: number } {
    const emotionSums: { [key: string]: number } = {};
    const emotionCounts: { [key: string]: number } = {};

    // Iterate over each day's averages to sum values and count occurrences for each emotion
    this._dailyAverages.forEach(day => {
      this.includedEmotions.forEach(emotion => {
        if (day.averages[emotion] !== undefined) {
          // If the emotion is present, add to the sum and increment the count
          if (!emotionSums[emotion]) {
            emotionSums[emotion] = 0;
            emotionCounts[emotion] = 0;
          }
          emotionSums[emotion] += day.averages[emotion];
          emotionCounts[emotion]++;
        }
      });
    });

    // Calculate the average for each emotion
    const emotionAverages: { [key: string]: number } = {};
    for (const emotion of this.includedEmotions) {
      if (emotionCounts[emotion]) { // Check to ensure we don't divide by zero
        emotionAverages[emotion] = emotionSums[emotion] / emotionCounts[emotion];
      }
    }

    return emotionAverages;
  }


}
