import { Testimonial } from "src/testimonials/entities/testimonial.entity";
import { UserRole } from "./userRole";


export type RequestUser = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  email: string;
  username: string;
  role: UserRole;
  name: string;
  testimonials?: Testimonial[];
  token: string;
  tokenExpiredAt: Date;
};
