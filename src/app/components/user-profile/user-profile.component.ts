import {CommonModule} from "@angular/common";
import {HttpResponse} from "@angular/common/http";
import {Component, OnInit} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {Router, RouterModule} from "@angular/router";
import { NrclexService } from "../../services/nrclex-service.service";
import {CurrentUserService} from "../../services/current-user-service.service";
import {UserService} from "../../services/user-service.service";
import {AccountStatus} from "../../types/account-status";
import {DailyAverage, HighestEmotion} from "../../types/emotion-reports";
import {User} from "../../types/user";
import { NrcLexEntry } from "../../types/nrclex-entry";
import {
  DailyEmotionGraphComponent
} from "../daily-emotion-graph/daily-emotion-graph.component";
import {VaderGraphComponent} from "../vader-graph/vader-graph.component";
import initHelpHero, {HelpHero} from 'helphero';



@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, VaderGraphComponent, DailyEmotionGraphComponent],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})

export class UserProfileComponent implements OnInit {

  hlp: HelpHero

  now = new Date();

  emotionScores: NrcLexEntry[] = [];
  dailyAverages: { averages: Record<string, number>; day: string }[] = [];

  user: User;
  errorMessage: string = "";
  updateMessage: string = "";
  updatingUserInfo = false;

  dailyEmotion: string = "Unsure"
  positivityPercentage: number = 0;

  borderColorPalette = [
    'rgb(75, 192, 192)', // green (joy)
    'rgb(255, 99, 132)', // red (anger)
    'rgb(201, 203, 207)', // grey (fear)
    'rgb(54, 162, 235)', // blue (sadness)
    'rgb(153, 102, 255)', // purple (trust)
  ];

  backgroundColorPalette = [
    'rgb(75, 192, 192)', // green (joy)
    'rgb(255, 99, 132)', // red (anger)
    'rgb(201, 203, 207)', // grey (fear)
    'rgb(54, 162, 235)', // blue (sadness)
    'rgb(153, 102, 255)', // purple (trust)
  ];

  includedEmotions: (keyof NrcLexEntry)[] = [
    'joy', 'anger', 'fear', 'sadness', 'trust', "anticipation", "disgust", "surprise",
    'vader_compound', 'vader_neg', 'vader_neu', 'vader_pos'
  ];

  constructor(
    private router: Router,
    private userService: UserService,
    private nrcLexService: NrclexService,
    private currentUserService: CurrentUserService
  ) {
    this.user = this.currentUserService.getUser();
    this.hlp = initHelpHero('9D94seCxsU');
  }

  ngOnInit(): void {

    this.errorMessage = "";
    this.updateMessage = "";

    if (!this.currentUserService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }

    this.user = this.currentUserService.getUser()

    if (this.user !== null && this.user.accountStatusId !== AccountStatus.ACTIVE) {
      this.router.navigate(['/login']);
      return;
    }

    this.renderCharts();

    this.hlp.identify(this.user.phone_number);

  }

  renderCharts(): void {
    const userId: number = this.user.id || 0;

    if (userId === 0) {
      console.log("No user ID set, cannot get emotions, cannot render chart");
      return;
    }

    this.nrcLexService.getEmotionsForWeek(userId).subscribe({
      next: (emotions) => this.handleFetchEmotions(emotions),
      error: (error) => this.showErrorMessage(error)
    });
  }

  handleFetchEmotions(response: HttpResponse<any>): void {

    let entries = response.body;

    if (!Array.isArray(entries) || entries.length === 0) {
      console.error('Entries is not an array or is empty:', entries);
      return;
    }

    this.emotionScores = entries.reverse();

    const groupedByDay: { [key: string]: NrcLexEntry[] } = {};

    // Populate groupedByDay with entries
    entries.forEach(entry => {
      // Assuming 'created_at' is a string representing the date and time
      const day = new Date(entry.created_at).toLocaleString('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });

      console.log(day)

      if (!groupedByDay[day]) {
        groupedByDay[day] = [];
      }
      groupedByDay[day].push(entry);
    });

    this.dailyAverages = Object.keys(groupedByDay).map(day => {
      const dayEntries = groupedByDay[day];
      const dailySums: Record<string, number> = {};
      const counts: Record<string, number> = {};

      this.includedEmotions.forEach(emotion => {
        dailySums[emotion] = 0.1;
        counts[emotion] = 0.1;
      });

      dayEntries.forEach(entry => {
        this.includedEmotions.forEach(emotion => {
          const value = entry[emotion];
          if (typeof value === 'number') {
            dailySums[emotion] += value;
            counts[emotion]++;
          }
        });
      });

      const averages = Object.keys(dailySums).reduce((acc, emotion) => {
        acc[emotion] = dailySums[emotion] / counts[emotion];
        return acc;
      }, {} as Record<string, number>);

      return {day, averages};
    });

    if (this.dailyAverages.length === 0) {
      console.log("No daily averages found, cannot render chart");
      return;
    }

    let topEmotion = this.findHighestEmotion(this.dailyAverages)
    this.dailyEmotion = topEmotion[0].emotion.toUpperCase()

    let vaderSentiment =
      (this.dailyAverages[0].averages['vader_neu'] +
      this.dailyAverages[0].averages['vader_pos']) -
      this.dailyAverages[0].averages['vader_neg'];

    this.positivityPercentage = Math.round(vaderSentiment * 100);


  }

  findHighestEmotion(dailyAverages: DailyAverage[]): HighestEmotion[] {
    return dailyAverages.map(({ day, averages }) => {
      let highestEmotion = '';
      let highestValue = -Infinity;

      Object.entries(averages).forEach(([emotion, value]) => {

        if (value > highestValue && emotion.indexOf("vader") < 0 ) {
          highestEmotion = emotion;
          highestValue = value;
        }
      });

      return {
        day,
        emotion: highestEmotion,
        value: highestValue,
      };
    });
  }

  closeWarning(): void {
    this.errorMessage = "";
    this.updateMessage = "";
  }

  signOut(): void {
    this.currentUserService.clearJwt();
    this.router.navigate(['/login']);
    return;
  }

  toggleNudges(): void {
    this.user.nudge_enabled = !this.user.nudge_enabled;
    this.updateProfile()
  }

  updateProfile(): void {

    this.closeWarning();
    this.updatingUserInfo = true
    this.user.password = null;
    console.log(this.user)
    this.userService.update(this.user).subscribe(
      (response: HttpResponse<any>) => this.handleUpdateResponse(response),
      (error: any) => this.showErrorMessage(error)
    )
  }

  handleUpdateResponse(response: HttpResponse<any>): void {

    this.updatingUserInfo = false;

    if (response.status === 200) {
      this.currentUserService.setJwt(response.body.data.token)
      this.user = this.currentUserService.getUser()
      console.log(this.user)
      this.updateMessage = 'Your profile has been updated.';
    } else {
      this.showErrorMessage(new Error(response.body.message));
    }
  }

  showErrorMessage(error: any): void {
    console.log("Error rendering chart: " + error.message);
    this.updatingUserInfo = false;
    this.errorMessage = error.message;
  }

  showUpdateMessage(msg: string) {
    this.updateMessage = msg;
  }

}
