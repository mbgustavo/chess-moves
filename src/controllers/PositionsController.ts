// Numeric indexes for piece position
interface NumericPosition {
  x: number,
  y: number
}

interface Piece {
  // possible dx and dy for the piece in one move
  possibleMoves: NumericPosition[], 
  // indicates if the piece can perform the possible moves multiples times (typically used for queens, bishops...)
  multipleMoves: boolean,
  // indicates if the piece must move strictly in the moves provided, without changing signs (typically used for pawns)
  strictMoves: boolean
}

const charCodeAtA = 'A'.charCodeAt(0); // Char code at uppercase A, first valid column
// sigInverters allows the piece to move in different directions invertings possibleMoves signs
const signInverters = [{ x: 1, y: 1 }, { x: 1, y: -1 }, { x: -1, y: 1 }, { x: -1, y: -1 }]

export class PositionsController {
  // pieces described
  private pieces: { [key: string]: Piece } = {
    horse: {
      possibleMoves: [{ x: 2, y: 1}, { x: 1, y: 2}],
      multipleMoves: false,
      strictMoves: false
    }
  }

  /** Get possible next positions for the piece received */
  public getNextPositions(pieceName: string, position: string): string[] {
    let pos = this.validateConvertPosition(position)
    if (!pos) return ['invalid position']

    const piece = this.pieces[pieceName]
    if (!piece) return ['invalid piece'];

    const numDirections = piece.strictMoves ? 1 : 4;
    let nextPositions: string[] = [];

    piece.possibleMoves.forEach(possibleMove => {
      let nextPosNumeric: NumericPosition;
      
      for (let i = 0; i < numDirections; i ++) {
        while (true) {
          nextPosNumeric = {
            x: pos.x + possibleMove.x * signInverters[i].x,
            y: pos.y + possibleMove.y * signInverters[i].y
          };
          if (this.isWithinTable(nextPosNumeric)) {
            nextPositions.push(this.convertToChessNotation(nextPosNumeric));
            if (piece.multipleMoves) {
              pos = nextPosNumeric;
            } else {
              break;
            }
          } else {
            break;
          }
        }
      }
    })

    return nextPositions;
  }

  /** Validate if position received has the correct format and is within the table and returns it in numeric indexes.
   * Returns null if invalid. */
  private validateConvertPosition(position: string): NumericPosition {
    if (position.length !== 2) return null;

    const [column, row]: string[] = position.split('')
    const x = column.charCodeAt(0) - charCodeAtA;
    const y = Number(row) - 1;

    if (!this.isWithinTable({ x, y })) return null;

    return { x, y };
  }

  /** Returns a boolean verifying if coordinates are inside the table */
  private isWithinTable(pos: NumericPosition): boolean {
    const tableSize = 8;

    return pos.x >= 0 && pos.x < tableSize &&
      pos.y >= 0 && pos.y < tableSize;
  }

  /** Returns chess notation converted from numeric indexes */
  private convertToChessNotation(pos: NumericPosition): string {
    const x = String.fromCharCode(pos.x + charCodeAtA);
    const y = String(pos.y + 1);
    return x + y;
  }
}