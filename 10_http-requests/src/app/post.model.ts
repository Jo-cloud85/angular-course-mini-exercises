// export class Post {
//   constructor(
//     public title: string,
//     public content: string,
//     public id?: string
//   ){}
// }

export interface Post {
  title: string,
  content: string,
  id?: string
}

export interface ResponseData {
  [key: string]: Post;
}