import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Globals2 } from '../globals';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class ApiService {
	private apiURL: string = environment.apiURL
	private endPoint: string 
	private authHeader: HttpHeaders;


	public readonly endPoints = {
		// Authentications
		login: `${this.apiURL}auth/login`,
	}

	constructor(private http: HttpClient, private globals: Globals2) { 
		this.authHeader = new HttpHeaders({ 'Authorization': `Bearer ${globals.currentUser.token}` })
	}

	public init = (endPoint: string) => this.endPoint = endPoint

	public all = (data: any = null, endPoint: string = null) =>
		this.http.get(`${this.apiURL}${endPoint || this.endPoint}`, { headers: this.authHeader })

	public create = (data: any, endPoint: string = null): Observable<any> =>
		this.http.post(`${this.apiURL}${endPoint || this.endPoint}`, data, { headers: this.authHeader })

	public read = (id: number, additional: any = {}, endPoint: string = null): Observable<any> =>
		this.http.get(`${this.apiURL}${endPoint || this.endPoint}${id ? id : ''}`, { params: additional, headers: this.authHeader })

	public update = (id: number, data: any, endPoint: string = null): Observable<any> =>
		this.http.patch(`${this.apiURL}${endPoint || this.endPoint}${id}`, data, { headers: this.authHeader })

	public delete = (id: number, additional: any = {}, endPoint: string = null): Observable<any> =>
		this.http.delete(`${this.apiURL}${endPoint || this.endPoint}${id}`, { params: additional, headers: this.authHeader })

	public request = (endPoint: string, data: any, type: RequestTypes) => {
		if (type == RequestTypes.DELETE)
			return this.delete(null, data, endPoint)
		else if (type == RequestTypes.GET)
			return this.read(null, data, endPoint)
		else if (type == RequestTypes.PATCH)
			return this.all(data, endPoint)
		else if (type == RequestTypes.POST)
			return this.create(data, endPoint)
		else if (type == RequestTypes.PUT)
			return this.update(null, data, endPoint)
	}
}

export enum RequestTypes {
	POST, GET, PUT, DELETE, PATCH
}