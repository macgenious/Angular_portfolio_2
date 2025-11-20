import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TypingGameService, Difficulty } from '../../services/typing-game.service';

@Component({
  selector: 'app-typing-game',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './typing-game.component.html',
  styleUrls: ['./typing-game.component.scss']
})
export class TypingGameComponent implements OnInit, OnDestroy {
  @Input() embedded = false;
  difficulty: Difficulty = 'easy';
  snippet = '';
  typed = '';
  startedAt = 0;
  timeLeft = 60;
  wpm = 0;
  accuracy = 100;
  running = false;
  highScores: { difficulty: Difficulty; wpm: number; accuracy: number; timestamp: number }[] = [];
  private timer?: any;

  constructor(private game: TypingGameService, private router: Router) {}

  ngOnInit(): void {
    this.highScores = this.game.getHighScores();
  }

  ngOnDestroy(): void {
    this.clearTimer();
  }

  back(): void {
    this.router.navigateByUrl('/projects');
  }

  start(): void {
    try {
      this.snippet = this.game.generateSnippet(this.difficulty);
      this.typed = '';
      this.wpm = 0;
      this.accuracy = 100;
      this.timeLeft = 60;
      this.startedAt = Date.now();
      this.running = true;
      this.clearTimer();
      this.timer = setInterval(() => {
        this.timeLeft = Math.max(0, 60 - Math.floor((Date.now() - this.startedAt) / 1000));
        this.updateMetrics();
        if (this.timeLeft === 0) {
          this.finish();
        }
      }, 200);
    } catch {
      this.running = false;
    }
  }

  onInputChange(value: string): void {
    if (!this.running) return;
    this.typed = value ?? '';
    this.updateMetrics();
  }

  private updateMetrics(): void {
    const m = this.game.computeMetrics(this.snippet, this.typed, this.startedAt);
    this.wpm = m.wpm;
    this.accuracy = m.accuracy;
  }

  finish(): void {
    if (!this.running) return;
    this.running = false;
    this.clearTimer();
    const m = this.game.computeMetrics(this.snippet, this.typed, this.startedAt);
    this.wpm = m.wpm;
    this.accuracy = m.accuracy;
    this.game.saveHighScore({ difficulty: this.difficulty, wpm: this.wpm, accuracy: this.accuracy, timestamp: Date.now() });
    this.highScores = this.game.getHighScores();
  }

  reset(): void {
    this.clearTimer();
    this.running = false;
    this.snippet = '';
    this.typed = '';
    this.wpm = 0;
    this.accuracy = 100;
    this.timeLeft = 60;
  }

  private clearTimer(): void {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = undefined;
    }
  }
}
