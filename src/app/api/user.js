let user = { name: "Xavier Johnson", email: "xavier@gmail.com" };

export default function handler(req, res) {
  if (req.method === "GET") {
    return res.status(200).json(user);
  }

  if (req.method === "PUT") {
    const { name, email } = req.body;
    user = { name, email };
    return res.status(200).json(user);
  }

  res.status(405).end(); // Method Not Allowed
}