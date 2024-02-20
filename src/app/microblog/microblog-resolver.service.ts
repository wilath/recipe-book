import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { MicroblogService } from './microblog.service';

@Injectable({ providedIn: 'root' })
export class MicroblogResolverService {
  constructor(private microblogService: MicroblogService) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.microblogService.setMicroblog();
  }
}
