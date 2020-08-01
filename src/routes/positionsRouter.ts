import { Request, Response, Router } from 'express';
import { PositionsController } from '../controllers/PositionsController';

const router = Router();
const positionsController = new PositionsController();

export const path = '/positions';

router.get('/:piece&:position', async (req: Request, res: Response,): Promise<Response | void> => {
  const piece = req.params.piece;
  const position = req.params.position;
  const result = positionsController.getNextPositions(piece, position);

  return res.status(result.status).json({ data: result.data, error: result.error });
});

export default router;