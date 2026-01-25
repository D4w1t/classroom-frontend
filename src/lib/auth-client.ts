import { createAuthClient } from "better-auth/react";
import * as z from "zod";

import { BACKEND_BASE_URL, USER_ROLES } from "@/constants";

export const authClient = createAuthClient({
  baseURL: `${BACKEND_BASE_URL}auth/`,
  user: {
    additionalFields: {
      role: {
        type: "string",
        required: true,
        defaultValue: "student",
        input: true,
        validator: {
          input: z.enum([
            USER_ROLES.STUDENT,
            USER_ROLES.TEACHER,
            USER_ROLES.ADMIN,
          ]),
        },
      },
      department: {
        type: "string",
        required: false,
        input: true,
      },
      imageCldPubId: {
        type: "string",
        required: false,
        input: true,
      },
    },
  },
});
