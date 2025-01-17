import withAuth from "next-auth/middleware";

export default withAuth({
  //   //Matches the paths that should be protected
  pages: {
    signIn: "/login",
    // error: "/error",
  },
});

export const config = { matcher: ["/dashboard", "/dashboard/profile"] };
