import { Post } from './../post';
import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent implements OnInit {
  form: any;
  user: null | Post = null;

  constructor(
    public postService: PostService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadForm();

    this.route.params.subscribe((params) => {
      let id = params['postId'];
      console.log(params);

      if (id) {
        this.user = this.postService.find(id);
        console.log(id, this.user);

        if (this.user) {
          this.loadForm(this.user);
        }
      }
    });
  }

  loadForm(user: Post | null = null) {
    this.form = new FormGroup({
      email: new FormControl(user?.email),
      first_name: new FormControl(user?.first_name),
      last_name: new FormControl(user?.last_name),
      avatar: new FormControl(user?.avatar),
    });
  }

  isEdit(): boolean {
    return this.user ? true : false;
  }

  submit() {
    console.log(this.form.value);
    if (this.user) {
      this.postService.create(this.form.value, this.user.id);
    } else {
      this.postService.create(this.form.value);
    }
    console.log('User created successfully!');
    this.router.navigateByUrl('post/index');
  }

  delete() {
    if (this.user) {
    this.postService.delete(this.user.id);
    }
    this.router.navigateByUrl('post/index');
  }
}
