import { PostService } from './../Services/post.service';
import { Post } from '../models/Post';
import { Comment } from './../models/comment';
import { CommentService } from './../Services/comment.service';
import { Component, OnInit,Input  } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

//import { PostService } from './../Services/post.service';

//import { Comment } from '../models/post';


@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit{

list: Comment[] = [];
comments: Comment[] = [];
idPost : number;
comment:Comment=new Comment();
post: Post
commentText: string = '';
posts: Post[] = [];  
listposts: Post[] = [];
token!:any;


constructor(private CommentService: CommentService,private active:ActivatedRoute,private PostService: PostService, private router: Router,private route: ActivatedRoute) {}


ngOnInit(): void {
  
 this.getAllComments();
 this.route.params.subscribe(params => {
  const idPost = params['idPost'];
  console.log('ID de publication:', idPost); // Afficher l'ID de publication dans la console

  // Vérifier si l'ID de la publication est défini
  if (idPost) {
    // Appeler la méthode pour récupérer les commentaires
    this.CommentService.getCommentBypostid(idPost).subscribe(
      comments => {
        this.list = comments; // Assigner les commentaires récupérés à votre liste de commentaires
      },
      error => {
        console.error('Erreur lors de la récupération des commentaires:', error);
        // Gérer les erreurs ici
      }
    );
  } else {
    console.error('ID de publication non défini.');
    // Gérer l'absence d'ID de publication ici, par exemple, rediriger l'utilisateur vers une autre page ou afficher un message d'erreur
  }
});
}

/*getAllPosts(): void { 
  this.PostService.findAll().subscribe(
    data => {
      this.posts = data;
    },
    error => {
      console.error('Error getting carpools:', error);
      // Handle errors
    }
  );
{

}}*/


/*commentOnPost(idPost: number): void {
  // Naviguer vers la page d'ajout de commentaire en passant l'ID du post
  this.router.navigate(['/addComment', idPost]);
}*/

getAllComments(): void { 
  this.CommentService.findAllcomment().subscribe(
    data => {
      this.comments = data;
    },
    error => {
      console.error('Error getting carpools:', error);
      // Handle errors
    }
  );}
/*
  getCommentBypostid(idPost: number): void {
    console.log('Updating comment with ID:', idPost);
    this.router.navigate(['/getCommentBypostid', idPost]);
  }


  //
  addComment(): void {
    // Redirige vers la page d'ajout de commentaire
    this.router.navigate(['/addComment']);
  }*/
  updateComment(id: number): void {
    console.log('Updating comment with ID:', id);
    this.router.navigate(['/updateComment', id]);
  }

  deleteComment(id:number): void {
    this.CommentService.deleteComment(id).subscribe(() : void => {
      this.getAllComments();
    });
  }

  /*sendComment()
  {
    this.CommentService.addCommentToPost( this.idPost,this.comment).subscribe(
      ()=>{
        this.PostService.getPostById(this.idPost).subscribe((data)=>this.comment.post=data)
        //this.userservice.getUserbyemail(this.userInfo.email).subscribe((data)=>this.comment.users=data)
        this.list.push(this.comment)
        window.location.reload()
      }
    )
    
  }

 ////
  
  
  
  
  getCommentsForPost(idPost: number): void {
    this.CommentService.getCommentsForPost(idPost).subscribe(
      data => {
        this.comments = data;
      },
      error => {
        console.error('Error getting comments:', error);
        // Handle errors
      }
    );
  }
  showComments(idPost: number): void {
    this.getCommentsForPost(idPost);
  }*/
 
  
}

