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
  // the fields below are necessary only if pawns are considered
  // strictMoves: boolean, // indicates if the piece must move strictly in the moves provided, without changing signs
  // attackMoves: NumericPosition[], // move that piece can do only if there is an enemy there
  // firstMove: boolean // indicates if it is the first move of the piece (pawns can move 2 times then)
}

const charCodeAtA = 'A'.charCodeAt(0); // Char code at uppercase A, first valid column
// sigInverters allows the piece to move in different directions invertings possibleMoves signs
const signInverters = [{ x: 1, y: 1 }, { x: 1, y: -1 }, { x: -1, y: 1 }, { x: -1, y: -1 }]

export class PositionsController {
  // pieces described
  private pieces: { [key: string]: Piece } = {
    horse: {
      possibleMoves: [{ x: 2, y: 1}, { x: 1, y: 2}],
      multipleMoves: false
    // },
    // knight: {
    //   possibleMoves: [{ x: 1, y: 0}, { x: 0, y: 1}],
    //   multipleMoves: true
    // },
    // bishop: {
    //   possibleMoves: [{ x: 1, y: 1}],
    //   multipleMoves: true
    // },
    // queen: {
    //   possibleMoves: [{ x: 1, y: 1}, { x: 1, y: 0}, { x: 0, y: 1}],
    //   multipleMoves: true
    // },
    // king: {
    //   possibleMoves: [{ x: 1, y: 1}, { x: 1, y: 0}, { x: 0, y: 1}],
    //   multipleMoves: false
    }
  }

  /** Get possible next positions for the piece received */
  public getNextPositions(pieceName: string, position: string): { status: number, [key: string]: any } {
    try {
      const pos = this.validateConvertPosition(position)
      if (!pos) return { status: 400, error: 'invalid-position' };

      const piece = this.pieces[pieceName]
      if (!piece) return { status: 400, error: 'invalid-piece' };

      return { status: 400, data: this.calculateNextPositions(piece, pos) };
    } catch (e) {
      return { status: 500, error: e };
    }
  }

  /** Calculate the possible next positions based on the piece and its current position */
  private calculateNextPositions(piece: Piece, pos: NumericPosition): string[] {
    let nextPositions: string[] = [];

    // Verify possible positions for each possible move
    piece.possibleMoves.forEach(possibleMove => {
      let nextPosNumeric: NumericPosition;

      // if a piece with strictMoves is considered, this loop should have only 1 iteration:
      // let numDirections = (piece.strictMoves ? 1 : signInverters.length)
      for (let i = 0; i < signInverters.length; i++) {
        // It is not necessary to calculate inverted signs for 0 move values
        if ((signInverters[i].x === -1 && possibleMove.x === 0) ||
          (signInverters[i].y === -1 && possibleMove.y === 0)) {
          continue;
        };

        let currentPos = pos;

        // Get possible next position until movement is impossible
        while (true) {
          nextPosNumeric = {
            x: currentPos.x + possibleMove.x * signInverters[i].x,
            y: currentPos.y + possibleMove.y * signInverters[i].y
          };

          if (this.isWithinTable(nextPosNumeric)) {
            nextPositions.push(this.convertToChessNotation(nextPosNumeric));
            if (piece.multipleMoves) {
              // Possible multiple moves, so calculate the next one based on the position got now
              currentPos = nextPosNumeric;
            } else {
              break; // Only one move is possible, break
            }
          } else {
            break; // We are not in the table anymore to keep moving
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