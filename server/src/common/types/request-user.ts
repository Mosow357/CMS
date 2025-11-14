import { Testimonial } from "src/testimonials/entities/testimonial.entity";
import { UserRole } from "./userRole";


export type RequestUser = {
  id: string;
  email: string;
  username: string;
  role: UserRole;
  name: string;
  testimonials: Testimonial[];
};
