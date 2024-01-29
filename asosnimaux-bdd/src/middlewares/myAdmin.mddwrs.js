import query from "../databases/init.db.js";

const myAdminMdlwr = (cdt) => async ({ body: { userID } }, res, next) => {
  const sql = `
    SELECT id, user_role
    FROM users
    WHERE id = ?
  `;

  const response = await query(sql, [userID]);
  const user = response[0];
  const role = user.user_role;

  if (cdt) return res.status(401).json({ message: `Unauthorized : You don't have the rights for this action.` });

  next();
}