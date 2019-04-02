import { Injectable } from '@angular/core'
import { Action } from '@ngrx/store'
import { User } from '../models/user.model';

export const GET_USER       = 'User'
export const REMOVE_USER       = 'Remove User'

export class GetUser implements Action {
    readonly type = GET_USER

    constructor(public payload: User) {}
}

export class RemoveUser implements Action {
    readonly type = REMOVE_USER

    constructor(public payload: User) {}
}

export type Actions = GetUser | RemoveUser


