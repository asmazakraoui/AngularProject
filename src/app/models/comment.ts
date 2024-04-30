import { Post } from "./Post";

export class Comment {
    idCmnt: number;
    descCmnt: string;
    dateCmnt: Date;
    post: Post;
}
