import { Piece } from '../core/interfaces'

// pieces described
const pieces: { [key: string]: Piece } = {
  horse: {
    possibleMoves: [{ x: 2, y: 1 }, { x: 1, y: 2 }],
    multipleMoves: false
  },
  knight: {
    possibleMoves: [{ x: 1, y: 0 }, { x: 0, y: 1 }],
    multipleMoves: true
  },
  bishop: {
    possibleMoves: [{ x: 1, y: 1 }],
    multipleMoves: true
  },
  queen: {
    possibleMoves: [{ x: 1, y: 1 }, { x: 1, y: 0 }, { x: 0, y: 1 }],
    multipleMoves: true
  },
  king: {
    possibleMoves: [{ x: 1, y: 1 }, { x: 1, y: 0 }, { x: 0, y: 1 }],
    multipleMoves: false
  },
  pawn: {
    possibleMoves: [{ x: 0, y: 1 }],
    multipleMoves: false,
    strictMoves: true,
    attackMoves: [{ x: 1, y: 1 }, { x: -1, y: 1 }],
    duplicateFirstMove: true
  }
}

export default pieces;