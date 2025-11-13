import { Injectable } from '@angular/core';

export type Difficulty = 'easy' | 'medium' | 'hard';

export interface HighScoreRecord {
  difficulty: Difficulty;
  wpm: number;
  accuracy: number; // 0..100
  timestamp: number;
}

@Injectable({ providedIn: 'root' })
export class TypingGameService {
  private readonly storageKey = 'typingGame.highScores';

  private readonly wordBank: Record<Difficulty, string[]> = {
    easy: [
      'cat', 'dog', 'sun', 'tree', 'book', 'milk', 'blue', 'bird', 'rain', 'leaf',
      'light', 'chair', 'table', 'phone', 'music', 'water', 'bread', 'green', 'smile', 'code'
    ],
    medium: [
      'angular', 'component', 'service', 'keyboard', 'accuracy', 'workflow', 'router', 'storage',
      'variable', 'function', 'typescript', 'subject', 'observe', 'compile', 'package', 'version',
      'optimize', 'tracking', 'animation', 'responsive'
    ],
    hard: [
      'synchronization', 'characterization', 'miscommunication', 'interoperability', 'microarchitecture',
      'incompatibility', 'responsiveness', 'configurability', 'decomposition', 'parallelization',
      'serialization', 'initialization', 'reproducibility', 'heterogeneous', 'idempotency',
      'observability', 'transcendental', 'multidimensional', 'imperceptible', 'electromagnetic'
    ],
  };

  generateSnippet(difficulty: Difficulty, wordCount = 18): string {
    const list = this.wordBank[difficulty];
    if (!list) throw new Error('Invalid difficulty');
    const words: string[] = [];
    for (let i = 0; i < wordCount; i++) {
      words.push(list[Math.floor(Math.random() * list.length)]);
    }
    const sentence = words.join(' ');
    return sentence.charAt(0).toUpperCase() + sentence.slice(1) + '.';
  }

  computeMetrics(target: string, typed: string, startMs: number): { wpm: number; accuracy: number; elapsedMs: number } {
    const now = Date.now();
    const elapsedMs = Math.max(0, now - startMs);
    const correctChars = this.countCorrectChars(target, typed);
    const totalTyped = typed.length;
    const accuracy = totalTyped === 0 ? 100 : (correctChars / totalTyped) * 100;
    const minutes = elapsedMs / 60000;
    const wpm = minutes === 0 ? 0 : Math.floor((correctChars / 5) / minutes);
    return { wpm, accuracy: Math.min(100, Math.max(0, Number(accuracy.toFixed(2)))), elapsedMs };
  }

  private countCorrectChars(target: string, typed: string): number {
    const len = Math.min(target.length, typed.length);
    let count = 0;
    for (let i = 0; i < len; i++) {
      if (typed[i] === target[i]) count++;
    }
    return count;
  }

  saveHighScore(record: HighScoreRecord): void {
    try {
      const list = this.getHighScores();
      list.push(record);
      list.sort((a, b) => b.wpm - a.wpm || b.accuracy - a.accuracy);
      const trimmed = list.slice(0, 10);
      localStorage.setItem(this.storageKey, JSON.stringify(trimmed));
    } catch {}
  }

  getHighScores(): HighScoreRecord[] {
    try {
      const raw = localStorage.getItem(this.storageKey);
      if (!raw) return [];
      const parsed = JSON.parse(raw) as HighScoreRecord[];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }
}

