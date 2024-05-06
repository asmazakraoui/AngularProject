import { Comment } from './comment';

export interface Post {
  idPost: number;
  descPost: string;
  dateCreation: Date;
  imagePost: string;
  likes: number;
  dislikes: number;
  comments?: Comment[]; // Utilisation du "?" pour indiquer que comments est optionnel
  commentText?: string; // Ajoutez cette propriété

}
