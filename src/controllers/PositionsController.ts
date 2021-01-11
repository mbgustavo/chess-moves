import pieces from '../collections/pieces';
import { NumericPosition, Piece } from '../core/interfaces';
import { charCodeAtA, signInverters } from '../core/constants';

export class PositionsController {
  /** Get possible next positions for the piece received */
  public getNextPositions(pieceName: string, position: string): { status: number, [key: string]: any } {
    try {
      const pos = this.validateConvertPosition(position)
      if (!pos) return { status: 400, error: 'invalid-position' };

      if (pieceName === 'pawn') return { status: 200, data: this.calculatePawnNextMoves(pos) };

      const piece = pieces[pieceName]
      if (!piece) return { status: 400, error: 'invalid-piece' };

      return { status: 200, data: this.calculateNextPositions(piece, pos) };
    } catch (e) {
      return { status: 500, error: e.toString() };
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

  private calculatePawnNextMoves(pos: NumericPosition): string[] {
    let nextPositions: string[] = [];
    let firstMove: Boolean;

    // Pawns start at position 1
    pos.y === 1 ? firstMove = true : firstMove = false;

    let nextPosNumeric: NumericPosition;
    let currentPos = pos;

    nextPosNumeric = {
      x: currentPos.x,
      y: currentPos.y + 1
    };

    if (this.isWithinTable(nextPosNumeric)) {
      nextPositions.push(this.convertToChessNotation(nextPosNumeric));
      if (firstMove) {
        // First move, possible to move twice, it is not necessary to check if it is within table
        nextPosNumeric = {
          x: currentPos.x,
          y: currentPos.y + 2
        };
        nextPositions.push(this.convertToChessNotation(nextPosNumeric));
      }
    }

    // Attack moves
    nextPosNumeric = {
      x: pos.x + 1,
      y: pos.y + 1
    };
    if (this.isWithinTable(nextPosNumeric)) nextPositions.push(this.convertToChessNotation(nextPosNumeric));

    nextPosNumeric = {
      x: pos.x - 1,
      y: pos.y + 1
    };
    if (this.isWithinTable(nextPosNumeric)) nextPositions.push(this.convertToChessNotation(nextPosNumeric));

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