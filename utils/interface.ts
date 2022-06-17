export interface IUser {
  user_id: number;
  user_created_at: Date;
  user_avatar: any;
  user_uuid: string;
  user_name: string;
}

export interface IReview {
  review_id: number;
  review_created_at: Date;
  difficulty: number;
  enjoyability: number;
  practicality: number;
  workload: number;
  review_description: String;
  review_module_code: String;
  review_user: String;
  review_helpful_count: number;
}

export interface IOverallReview {
  Difficulty: number;
  Enjoyability: number;
  Practicality: number;
  Workload: number;
  total_count: number;
}

export interface IReviewByUser extends IReview {
  Users: IUser;
  votedHelpfulByUser: boolean;
  reportedByUser: boolean;
}
