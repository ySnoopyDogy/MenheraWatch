import { Request, Response, NextFunction } from 'express'

export default (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.token

  if (!token || token !== process.env.API_TOKEN) {
    return res.status(401).send({ message: "Only the Menhera Client can access that!" })
  }

  next()
}