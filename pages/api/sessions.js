import { withIronSession } from "next-iron-session";


export default withIronSession(
  async (req, res) => {
    if (req.method === "POST") {

      const { email, password } = req.body;
        
      if (email && password) {
        req.session.set("user", { email });
        await req.session.save();
        return res.status(201).send("");
      }

      return res.status(403).send("");
    }
	if (req.method === "DELETE") {
      
        req.session.set("user", null);
        await req.session.save();
        return res.status(201).send("");
    }

    return res.status(404).send("");
  },
  {
    cookieName: "MYSITECOOKIE",
    cookieOptions: {
      secure: process.env.NODE_ENV === "production" ? true : false
    },
    password: process.env.APPLICATION_SECRET
  }
);