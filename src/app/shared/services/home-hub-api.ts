import {inject, Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class HomeHubApi {

  private http = inject(HttpClient);
  private readonly API_URL: string = environment.apiUrl;

  get<T>(route: string)   { return this.http.get<T>(this.generateUrl(route)); }
  post<T>(route: string, body: any) { return this.http.post<T>(this.generateUrl(route), body); }
  put<T>(route: string, body: any)  { return this.http.put<T>(this.generateUrl(route), body); }
  delete<T>(route: string) { return this.http.delete<T>(this.generateUrl(route)); }

  private generateUrl(route: string): string {
    return `${this.API_URL}/${route}`;
  }
}
