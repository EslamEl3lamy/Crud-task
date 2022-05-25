import { Post } from './post';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private users = 'https://reqres.in/api/users?page=1';
  private singleUser = 'https://reqres.in/api/users/';
  public usersList: Post[] = [];
  usersListChanged = new Subject<Post[]>();

  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<any> {
    return this.httpClient.get<{ data: [] }>(this.users);
  }

  loadUsers(): void {
    this.fetchFromLocalStorage();

    if (!this.usersList.length) {
      this.getAll().subscribe((response) => {
        this.usersList = response.data;
        this.saveToLocalStorage();
      });
    }
  }

  find(id: number): Post | null {
    // return this.httpClient.get(this.singleUser + id);
    this.fetchFromLocalStorage();
    return this.usersList.find((user) => user.id == id) ?? null;
  }

  create(
    userData: {
      email: string;
      first_name: string;
      last_name: string;
      avatar: string;
    },
    id = 0
  ) {
    if (id === 0) {
      id = this.usersList.length + 1000;
      this.usersList.push({ ...userData, id: id });
    } else {
      let updateUser = this.usersList.find((user) => user.id == id);

      if (updateUser) {
        let index = this.usersList.indexOf(updateUser);

        this.usersList[index] = { ...userData, id: id };
      }
    }

    this.saveToLocalStorage();
  }

  delete(id: any) {
    let delteUser = this.usersList.find((user) => user.id == id);

    if (delteUser) {
      let index = this.usersList.indexOf(delteUser);
      this.usersList.splice(index, 1);
      this.saveToLocalStorage();
    }
  }

  saveToLocalStorage() {
    localStorage.setItem('users', JSON.stringify(this.usersList));
    console.log(this.usersList);
    this.usersListChanged.next(this.usersList.slice());
  }

  fetchFromLocalStorage() {
    this.usersList = JSON.parse(localStorage.getItem('users') || '[]');
    console.log(this.usersList.slice());
    this.usersListChanged.next(this.usersList.slice());
  }
}
