import { withIronSession } from "next-iron-session";

export default function index(){}

export const getServerSideProps = withIronSession(
    async ({ req, res }) => {
      const user = req.session.get("admin");
      if (!user) {
        const userfili = req.session.get("filiado");
        if(userfili){
          res.setHeader("location", "/filiado/classificados");
          res.statusCode = 302;
          res.end();
          return { props: {userfili} };
        }else{
          res.setHeader("location", "/login");
          res.statusCode = 302;
          res.end();
          return { props: {} };
        }
      }
      res.setHeader("location", "/admin/noticias");
          res.statusCode = 302;
          res.end();
      return {      
        props: { user }
      };
    },
    {
      cookieName: "MYSITECOOKIE",
      cookieOptions: {
        secure: process.env.NODE_ENV === "production" ? true : false
      },
      password: process.env.APPLICATION_SECRET
    }
  );