
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommentService } from '../Services/comment.service';
import { PostService } from '../Services/post.service';
import { Comment } from '../models/comment';
import { Post } from '../models/Post';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import { ReactService } from '../Services/react.service';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css'],
  providers: [DatePipe] 
})
export class PostDetailsComponent implements OnInit {
  comments: Comment[];
  posts: Post[] = [];
  totalPages: number = 0;
  currentPage: number = 1;
  pageSize: number = 3;
  displayedPosts: Post[] = [];
  commentForm!: FormGroup;
  commentText: string = ''; // Propriété pour stocker le texte du commentaire
  likes: number = 0;
  dislikes: number = 0;
  currentDate: Date;



id: any;
  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private commentService: CommentService,
    private reactService : ReactService,
    private router: Router,
    private datePipe: DatePipe
  ) {
    this.currentDate = new Date();
  }

  ngOnInit(): void {
    this.getAllPosts();
  }
 
  formatDate(date: Date): string {
    const dateFormat = 'yyyy-MM-dd HH:mm:ss';
    return this.datePipe.transform(date, dateFormat) || '';
  }
  
  getImageUrl(post: Post): string {
    return `http://localhost/Uploads/Images/${post.imagePost}`;
  }
  getAllPosts(): void {
    this.postService.findAll().subscribe(
      data => {
        this.posts = data;

        this.totalPages = Math.ceil(this.posts.length / this.pageSize);
        this.applyPagination();
        this.loadCommentsForAllPosts();
        this.loadLikesAndDislikes(); // Ajoutez cette ligne
      },
      error => {
        console.error('Error getting posts:', error);
      }
    );
  }
  loadLikesAndDislikes(): void {
    // Pour chaque post, charger les nombres de likes et dislikes depuis le stockage local
    this.posts.forEach(post => {
      post.likes = Number(localStorage.getItem(`post_${post.idPost}_likes`)) || 0;
      post.dislikes = Number(localStorage.getItem(`post_${post.idPost}_dislikes`)) || 0;
    });
  }

  loadCommentsForAllPosts(): void {
    this.posts.forEach(post => {
      this.commentService.getCommentBypostid(post.idPost).subscribe(
        comments => {
          post.comments = comments;
        },
        error => {
          console.error('Error loading comments for post:', error);
        }
      );
    });
  }


  //add comment to post
  addComment(post: Post, commentDesc: string): void {
    console.log("🚀 ~ PostDetailsComponent ~ addComment ~ post:", post)
    const comment: Comment = {
      idCmnt: null,
      descCmnt: commentDesc,
      dateCmnt: new Date(), // Use new Date() to set the current date and time
      post: null
    };
    try {
      this.commentService.addCommentToPost(post.idPost, comment).subscribe(
        newComment => {
          console.log('Comment added successfully', newComment);
            post.comments = newComment
        this.commentText = '';

        },
        (error: HttpErrorResponse) => {
          console.log("🚀 ~ PostDetailsComponent ~ addComment ~ error:", error)
          if (error.status !== 201) {
            console.error('Error adding comment', error);
            alert(error);
          }
        }
      );
    } catch (error) {
    console.log("🚀 ~ PostDetailsComponent ~ addComment ~ error:", error)

    }

}
  refreshComments(post: Post): void {
    this.commentService.getCommentsForPost(post.idPost).subscribe(
      comments => {
        post.comments = comments;

      },
      error => {
        console.error('Error loading comments for post:', error);
      }
    );
  }
  //delete comment of post
  getAllComments(): void {
    this.commentService.findAllcomment().subscribe(
      data => {
        this.comments = data;
      },
      error => {
        console.error('Error getting carpools:', error);
        // Handle errors
      }
    );}

  deleteComment(id:number): void {
  // Appel du service pour supprimer le commentaire avec l'identifiant spécifié
    this.commentService.deleteComment(id).subscribe(() : void => {
    this.getAllComments()
 // Recherche du post contenant le commentaire supprimé dans la liste des posts
      const postToUpdate = this.posts.find(post => post.comments.some(comment => comment.idCmnt === id));
    if (postToUpdate) {
      this.refreshComments(postToUpdate);
    }
    });
  }




//// like and dislike
likePost(post: Post): void {
  this.reactService.likePost(post.idPost).subscribe(
    response => {
      console.log('Post liked successfully', response);
      post.likes++;
      localStorage.setItem(`post_${post.idPost}_likes`, post.likes.toString());
    },
    error => {
      console.error('Error liking post:', error);
      alert('Failed to like post. Please try again.');
    }
  );
}



  dislikePost(post: Post): void {
    this.reactService.dislikePost(post.idPost).subscribe(
      response => {
        console.log('Post disliked successfully', response);
        post.dislikes++;// Decrémente le compteur de like de la publication
        localStorage.setItem(`post_${post.idPost}_dislikes`, post.dislikes.toString()); // Mettre à jour le stockage local

      },
      error => {
        console.error('Error disliking post', error);
        console.error('Error liking post:', error);
        alert('Failed to like post. Please try again.');
      }
      
    );

  }


   /// pagination
  getPageNumbers(): number[] {
   // Initialise un tableau vide pour stocker les numéros de page
     const pageNumbers: number[] = [];
    // Boucle à travers chaque numéro de page jusqu'au nombre total de pages
   for (let i = 1; i <= this.totalPages; i++) {
     // Ajoute le numéro de page actuel au tableau
     pageNumbers.push(i);
    }
    return pageNumbers;
  }

  goToPage(page: number): void {
   // Vérifie si le numéro de page spécifié est valide
   if (page >= 1 && page <= this.totalPages) {
   // Si c'est le cas, elle met à jour la variable currentPage et applique la pagination
      this.currentPage = page;
      this.applyPagination();
    }
  }
// détermine quelles publications doivent être affichées sur la page actuelle
// en fonction de la page qu'il consulte et de la taille de la page définie
  applyPagination(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.displayedPosts = this.posts.slice(startIndex, endIndex);
  }


}


