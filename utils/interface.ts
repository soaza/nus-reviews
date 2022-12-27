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
  review_description: String;
  review_module_code: String;
  review_user: String;
  review_helpful_count: number;
  difficulty: number;
  enjoyability: number;
  practicality: number;
  workload: number;
  overall_score: number;
}

export interface IOverallReview {
  difficulty: number;
  enjoyability: number;
  practicality: number;
  workload: number;
  overall: number;
  total_count: number;
}

export interface IReviewByUser extends IReview {
  Users: IUser;
  votedHelpfulByUser: boolean;
  reportedByUser: boolean;
}

export interface ILeaderboardModule {
  module_code: string;
  review_metric: number;
}

export type TLeaderboardCategory =
  | "most_reviewed"
  | "top_rated_modules"
  | "top_rated_general_modules";

export type TLeaderboardMetric = "reviews" | "score";
