import { TestBed } from '@angular/core/testing';
import { TypingGameService } from './typing-game.service';

describe('TypingGameService', () => {
  let service: TypingGameService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypingGameService);
  });

  it('generates a snippet for each difficulty', () => {
    const easy = service.generateSnippet('easy');
    const med = service.generateSnippet('medium');
    const hard = service.generateSnippet('hard');
    expect(easy.length).toBeGreaterThan(10);
    expect(med.length).toBeGreaterThan(10);
    expect(hard.length).toBeGreaterThan(10);
    expect(easy.endsWith('.')).toBeTrue();
  });

  it('computes accuracy and wpm correctly', () => {
    const start = Date.now() - 60000; // 1 minute elapsed
    const target = 'hello world';
    const typed = 'hello wurld'; // 10 typed, 10 compared, 9 correct
    const { wpm, accuracy } = service.computeMetrics(target, typed, start);
    expect(Math.round(accuracy)).toBe(90);
    // 9 correct chars => 9/5 = 1.8 WPM in 1 minute, floored
    expect(wpm).toBe(1);
  });
});

