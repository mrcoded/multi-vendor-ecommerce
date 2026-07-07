import { cache } from "react";

import { auth } from "@/auth";

/** Deduplicate session lookups within a single request (layout + page). */
export const getAuthSession = cache(auth);
