export interface User {
  _id: string;
  username: string;
  bio: string;
  wallet: string;
  rank: number;
  achievements: string[];
  avatar: string;
  online: boolean;
}
