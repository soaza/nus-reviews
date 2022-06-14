export interface IUser {
  created_at: Date;
  user_avatar: any;
  user_uuid: string;
  user_name: string;
}

export interface IReview {
  created_at: Date;
  Difficulty: number;
  Enjoyability: number;
  Practicality: number;
  Workload: number;
  review_description: String;
  review_helpful_count: number;
  review_module_code: String;
  review_user: String;
}

export interface IReviewByUser extends IReview {
  Users: IUser;
}
