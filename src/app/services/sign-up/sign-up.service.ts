import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {LanguageService} from '../language/language.service';

@Injectable({
  providedIn: 'root'
})
export class SignUpService {

  private readonly baseUrl: string;

  constructor(
    private httpClient: HttpClient
  ) {
    this.baseUrl = environment.apiUrl + '/signup';
  }

  public signup(email: string, password: string): Observable<any> {
    return this.httpClient.post(this.baseUrl, {
      email,
      password
    }, {
      headers: {
        'X-Language': LanguageService.getLanguageCode()
      }
    })
  }

}
