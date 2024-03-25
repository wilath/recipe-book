import { Injectable } from '@angular/core';
import { MicroblogService } from './microblog.service';
import { ReplaySubject, first } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MicroblogResolverService {
  constructor(private microblogService: MicroblogService) {}
  requested = false;
  subject = new ReplaySubject<void>();

  resolve() {
    if (!this.requested) {
      this.requested = true;

      this.microblogService
        .setMicroblog()
        .subscribe((nr) => this.subject.next(nr));
    }

    return this.subject.pipe(first());
  }
}
