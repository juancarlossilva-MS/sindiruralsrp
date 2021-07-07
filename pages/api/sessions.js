import { withIronSession } from "next-iron-session";


export default withIronSession(
  async (req, res) => {
    if (req.method === "POST") {
      const { email, password, tipo,user } = req.body;
        
      if (email && password) {
        req.session.set(tipo, { user });
        await req.session.save();
        return res.status(201).send("");
      }

      return res.status(403).send("");
    }
	if (req.method === "DELETE") {
        req.session.set("admin", null);
        req.session.set("filiado", null);
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