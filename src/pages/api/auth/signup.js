// export default async function handler(req, res) {
//   if (req.method === "POST") {
//     const { name, email, password } = req.body;

//     // Add your signup logic here, e.g., save user to the database
//     // For now, we'll just mock a successful response

//     if (email && password && name) {
//       // Mock successful response
//       res.status(200).json({ message: "Signup successful" });
//     } else {
//       res.status(400).json({ error: "Invalid input" });
//     }
//   } else {
//     res.setHeader("Allow", ["POST"]);
//     res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// }
